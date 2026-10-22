export interface BodyMeasurements {
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  thigh: number; // cm
  shoulder?: number; // cm
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user';
  avatar: string;
  address: string;
  phone: string;
}

export interface UpcycleConcept {
  id: string;
  title: string;
  aesthetic: string;
  difficulty: 'Mudah' | 'Sedang' | 'Mahir';
  estimatedTailorHours: number;
  estimatedCost: string;
  deconstructionSteps: string[];
  tailoringTips: string;
  recommendedAdditionalFabrics: string;
  fitProfile: 'Relaxed Fit' | 'Regular Fit' | 'Slim Fit';
  sourceGarment: string;
  userImageUrl?: string;
  previewColorPrimary?: string;
  previewColorAccent?: string;
}

export interface ReverseMarketOffer {
  id: string;
  postId: string;
  offererId: string;
  offererName: string;
  offererAvatar: string;
  price: number;
  itemDescription: string;
  itemImageUrl?: string;
  itemCondition: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ReverseMarketReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface ReverseMarketPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  type: 'wanted' | 'available';
  title: string;
  description: string;
  category: string;
  budgetOrPrice: number;
  location: string;
  imageUrl?: string;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  offers: ReverseMarketOffer[];
  replies: ReverseMarketReply[];
}

export interface TailorProfile {
  id: string;
  name: string;
  workshopName: string;
  avatar: string;
  location: string;
  city: string;
  distanceKm: number;
  specialties: string[];
  rating: number;
  reviewCount: number;
  completedProjects: number;
  startingPrice: number;
  turnaroundDays: number;
  bio: string;
  portfolioImages: string[];
  phone: string;
}

export interface DriverPartner {
  id: string;
  name: string;
  vehicleType: string;
  licensePlate: string;
  rating: number;
  avatar: string;
  phone: string;
}

export type OrderStatus =
  | 'pickup_scheduled'
  | 'with_driver_pickup'
  | 'tailor_working'
  | 'with_driver_delivery'
  | 'completed';

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  tailorId: string;
  tailorName: string;
  tailorWorkshop: string;
  tailorAddress: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  concept: UpcycleConcept;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  totalPrice: number;
  tailorFee: number;
  deliveryFee: number;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'QRIS' | 'E-Wallet' | 'Kartu Debit/Kredit' | 'Transfer Bank';
