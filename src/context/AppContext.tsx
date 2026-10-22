import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ReverseMarketPost,
  ReverseMarketOffer,
  TailorProfile,
  Order,
  UpcycleConcept,
  PaymentMethod,
} from '../types';
import {
  DEMO_DRIVER,
  INITIAL_TAILORS,
  INITIAL_POSTS,
  INITIAL_CONCEPTS,
  INITIAL_ORDERS,
} from '../data/mockData';

export type NavigationTab =
  | 'business-info'
  | 'auth'
  | 'landing'
  | 'explore'
  | 'ai-studio'
  | 'reverse-market'
  | 'tailors'
  | 'orders';

interface AppContextType {
  currentUser: UserProfile;
  hasSession: boolean;
  registerUser: (
    profile: Pick<UserProfile, 'name' | 'email' | 'phone' | 'address'>,
    password: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  continueAsGuest: () => void;
  logout: () => void;
  updateProfile: (profile: Partial<Pick<UserProfile, 'address' | 'phone'>>) => void;
  posts: ReverseMarketPost[];
  createPost: (
    data: Pick<ReverseMarketPost, 'title' | 'description' | 'category' | 'budgetOrPrice' | 'type' | 'imageUrl' | 'location'>
  ) => void;
  likePost: (postId: string) => void;
  addReply: (postId: string, content: string) => void;
  addOffer: (
    postId: string,
    offer: { price: number; itemDescription: string; itemCondition: string; itemImageUrl?: string }
  ) => void;
  acceptOffer: (postId: string, offerId: string) => void;
  tailors: TailorProfile[];
  orders: Order[];
  createOrder: (
    tailorId: string,
    concept: UpcycleConcept,
    paymentMethod: PaymentMethod,
    pickupAddress: string
  ) => Order;
  currentDesign: UpcycleConcept;
  setCurrentDesign: (design: UpcycleConcept) => void;
  allDesigns: UpcycleConcept[];
  saveDesign: (design: UpcycleConcept) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  notification: { message: string; type: 'success' | 'info' } | null;
  showNotification: (message: string, type?: 'success' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface StoredAccount {
  salt: string;
  passwordHash: string;
  profile: UserProfile;
}

const AUTH_SESSION_KEY = 'trifest_auth_session';
const ACCOUNTS_KEY = 'trifest_accounts';

const createGuestProfile = (): UserProfile => ({
  id: `guest-${Date.now()}`,
  name: 'Tamu',
  email: '',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  address: '',
  phone: '',
});

const removeLegacyMeasurements = (
  profile: UserProfile & { measurements?: unknown }
): UserProfile => {
  const { measurements: _measurements, ...userProfile } = profile;
  return userProfile;
};

const removeLegacyOrderDetails = (
  order: Order & { measurements?: unknown; statusHistory?: unknown }
): Order => {
  const { measurements: _measurements, statusHistory: _statusHistory, ...savedOrder } = order;
  return savedOrder;
};

const encodeBytes = (bytes: Uint8Array) => {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const decodeBytes = (value: string) =>
  Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

const hashPassword = async (password: string, salt: Uint8Array<ArrayBuffer>) => {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Login lokal membutuhkan browser modern melalui HTTPS atau localhost.');
  }

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 210_000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return encodeBytes(new Uint8Array(hash));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authSession, setAuthSession] = useState<'account' | 'guest' | null>(() => {
    const session = localStorage.getItem(AUTH_SESSION_KEY);
    return session === 'account' || session === 'guest' ? session : null;
  });
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const session = localStorage.getItem(AUTH_SESSION_KEY);
    if (session === 'guest') return createGuestProfile();
    const saved = session === 'account' ? localStorage.getItem('trifest_user') : null;
    if (!saved) return createGuestProfile();
    return removeLegacyMeasurements(JSON.parse(saved) as UserProfile & { measurements?: unknown });
  });

  const [posts, setPosts] = useState<ReverseMarketPost[]>(() => {
    const saved = localStorage.getItem('trifest_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [tailors] = useState<TailorProfile[]>(INITIAL_TAILORS);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('trifest_orders');
    if (!saved) return INITIAL_ORDERS;
    const savedOrders = JSON.parse(saved) as Array<
      Order & { measurements?: unknown; statusHistory?: unknown }
    >;
    return savedOrders.map(removeLegacyOrderDetails);
  });

  const [allDesigns, setAllDesigns] = useState<UpcycleConcept[]>(() => {
    const saved = localStorage.getItem('trifest_designs');
    return saved ? JSON.parse(saved) : INITIAL_CONCEPTS;
  });

  const [currentDesign, setCurrentDesign] = useState<UpcycleConcept>(allDesigns[0]);
  const [activeTab, setActiveTab] = useState<NavigationTab>('business-info');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('trifest_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('trifest_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('trifest_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('trifest_designs', JSON.stringify(allDesigns));
  }, [allDesigns]);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const registerUser: AppContextType['registerUser'] = async (profile, password) => {
    const email = profile.email.trim().toLocaleLowerCase();
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}') as Record<string, StoredAccount>;
    if (accounts[email]) {
      throw new Error('Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.');
    }

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const user: UserProfile = {
      ...profile,
      avatar: createGuestProfile().avatar,
      email,
      id: `user-${Date.now()}`,
      role: 'user',
    };
    const account: StoredAccount = {
      salt: encodeBytes(salt),
      passwordHash: await hashPassword(password, salt),
      profile: user,
    };
    accounts[email] = account;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem('trifest_user', JSON.stringify(user));
    localStorage.setItem(AUTH_SESSION_KEY, 'account');
    setCurrentUser(user);
    setAuthSession('account');
  };

  const loginUser: AppContextType['loginUser'] = async (emailInput, password) => {
    const email = emailInput.trim().toLocaleLowerCase();
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}') as Record<string, StoredAccount>;
    const account = accounts[email];
    if (!account) {
      throw new Error('Email atau kata sandi tidak cocok.');
    }

    const passwordHash = await hashPassword(password, decodeBytes(account.salt));
    if (passwordHash !== account.passwordHash) {
      throw new Error('Email atau kata sandi tidak cocok.');
    }

    const user = removeLegacyMeasurements(
      account.profile as UserProfile & { measurements?: unknown }
    );
    accounts[email] = { ...account, profile: user };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem('trifest_user', JSON.stringify(user));
    localStorage.setItem(AUTH_SESSION_KEY, 'account');
    setCurrentUser(user);
    setAuthSession('account');
  };

  const continueAsGuest = () => {
    const guest = createGuestProfile();
    localStorage.setItem(AUTH_SESSION_KEY, 'guest');
    setCurrentUser(guest);
    setAuthSession('guest');
  };

  const logout = () => {
    localStorage.removeItem(AUTH_SESSION_KEY);
    setCurrentUser(createGuestProfile());
    setAuthSession(null);
    setIsAuthModalOpen(false);
  };

  const updateProfile = (profile: Partial<Pick<UserProfile, 'address' | 'phone'>>) => {
    const updatedUser = { ...currentUser, ...profile };
    setCurrentUser(updatedUser);
    if (authSession === 'account') {
      const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}') as Record<string, StoredAccount>;
      const account = accounts[currentUser.email];
      if (account) {
        accounts[currentUser.email] = { ...account, profile: updatedUser };
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      }
    }
    showNotification('Profil berhasil diperbarui');
  };

  const createPost = (
    data: Pick<ReverseMarketPost, 'title' | 'description' | 'category' | 'budgetOrPrice' | 'type' | 'imageUrl' | 'location'>
  ) => {
    const newPost: ReverseMarketPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: 'Thrifter',
      type: data.type,
      title: data.title,
      description: data.description,
      category: data.category,
      budgetOrPrice: data.budgetOrPrice,
      location: data.location || 'Indonesia',
      imageUrl: data.imageUrl,
      likes: 0,
      isLiked: false,
      createdAt: 'Baru saja',
      offers: [],
      replies: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    showNotification('Postingan berhasil diterbitkan ke Reverse Market');
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
          };
        }
        return post;
      })
    );
  };

  const addReply = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: `rep-${Date.now()}`,
                postId,
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorAvatar: currentUser.avatar,
                content,
                createdAt: 'Baru saja',
              },
            ],
          };
        }
        return post;
      })
    );
    showNotification('Balasan berhasil dikirim');
  };

  const addOffer = (
    postId: string,
    offerData: { price: number; itemDescription: string; itemCondition: string; itemImageUrl?: string }
  ) => {
    const newOffer: ReverseMarketOffer = {
      id: `offer-${Date.now()}`,
      postId,
      offererId: currentUser.id,
      offererName: currentUser.name,
      offererAvatar: currentUser.avatar,
      price: offerData.price,
      itemDescription: offerData.itemDescription,
      itemCondition: offerData.itemCondition,
      itemImageUrl: offerData.itemImageUrl,
      createdAt: 'Baru saja',
      status: 'pending',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            offers: [...post.offers, newOffer],
          };
        }
        return post;
      })
    );
    showNotification('Penawaran baju berhasil diajukan');
  };

  const acceptOffer = (postId: string, offerId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            offers: post.offers.map((off) =>
              off.id === offerId
                ? { ...off, status: 'accepted' as const }
                : { ...off, status: 'declined' as const }
            ),
          };
        }
        return post;
      })
    );
    showNotification('Penawaran diterima! Silakan atur penjemputan via Driver');
  };

  const saveDesign = (design: UpcycleConcept) => {
    setAllDesigns((prev) => {
      const exists = prev.some((d) => d.id === design.id);
      if (exists) {
        return prev.map((d) => (d.id === design.id ? design : d));
      }
      return [design, ...prev];
    });
    setCurrentDesign(design);
    showNotification('Konsep desain berhasil disimpan ke Galeri Studio');
  };

  const createOrder = (
    tailorId: string,
    concept: UpcycleConcept,
    paymentMethod: PaymentMethod,
    pickupAddress: string
  ): Order => {
    const tailor = tailors.find((t) => t.id === tailorId) || tailors[0];
    const tailorFee = tailor.startingPrice;
    const deliveryFee = 20000;
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderCode: `TRF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAddress: pickupAddress,
      userPhone: currentUser.phone,
      tailorId: tailor.id,
      tailorName: tailor.name,
      tailorWorkshop: tailor.workshopName,
      tailorAddress: tailor.location + ', ' + tailor.city,
      driverId: DEMO_DRIVER.id,
      driverName: DEMO_DRIVER.name,
      driverPhone: DEMO_DRIVER.phone,
      concept,
      status: 'pickup_scheduled',
      paymentMethod,
      totalPrice: tailorFee + deliveryFee,
      tailorFee,
      deliveryFee,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      updatedAt: 'Baru saja',
    };

    setOrders((prev) => [newOrder, ...prev]);
    showNotification(`Pesanan ${newOrder.orderCode} berhasil dibuat! Driver segera menjemput.`);
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        hasSession: authSession !== null,
        registerUser,
        loginUser,
        continueAsGuest,
        logout,
        updateProfile,
        posts,
        createPost,
        likePost,
        addReply,
        addOffer,
        acceptOffer,
        tailors,
        orders,
        createOrder,
        currentDesign,
        setCurrentDesign,
        allDesigns,
        saveDesign,
        activeTab,
        setActiveTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
