import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/mockData';
import {
  Repeat,
  Heart,
  MessageSquare,
  Tag,
  Send,
  Upload,
  CheckCircle2,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const ReverseMarketView: React.FC = () => {
  const {
    posts,
    createPost,
    likePost,
    addReply,
    addOffer,
    acceptOffer,
    currentUser,
    showNotification,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'wanted' | 'available'>('all');
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [activeOfferPostId, setActiveOfferPostId] = useState<string | null>(null);

  // New Post Form State
  const [postType, setPostType] = useState<'wanted' | 'available'>('wanted');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postCategory, setPostCategory] = useState('Fashion');
  const [postBudget, setPostBudget] = useState(100000);
  const [postLocation, setPostLocation] = useState(currentUser.address.split(',')[1]?.trim() || 'Jakarta Selatan');
  const [postImage, setPostImage] = useState<string | null>(null);

  // Reply input state
  const [replyText, setReplyText] = useState('');

  // Make Offer Modal State
  const [offerPrice, setOfferPrice] = useState(100000);
  const [offerDescription, setOfferDescription] = useState('');
  const [offerCondition, setOfferCondition] = useState('Bekas Terawat (Kondisi 8.5/10)');
  const [offerImage, setOfferImage] = useState<string | null>(null);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postDescription.trim()) {
      showNotification('Harap lengkapi judul dan deskripsi postingan', 'info');
      return;
    }

    createPost({
      type: postType,
      title: postTitle,
      description: postDescription,
      category: postCategory,
      budgetOrPrice: Number(postBudget),
      location: postLocation,
      imageUrl: postImage || (postType === 'wanted' ? ASSET_IMAGES.denimJacket : ASSET_IMAGES.cargoVest),
    });

    setPostTitle('');
    setPostDescription('');
    setPostImage(null);
  };

  const handleSendReply = (postId: string) => {
    if (!replyText.trim()) return;
    addReply(postId, replyText);
    setReplyText('');
  };

  const handleSubmitOffer = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!offerDescription.trim()) {
      showNotification('Harap tuliskan deskripsi barang yang Anda tawarkan', 'info');
      return;
    }

    addOffer(postId, {
      price: Number(offerPrice),
      itemDescription: offerDescription,
      itemCondition: offerCondition,
      itemImageUrl: offerImage || ASSET_IMAGES.denimJacket,
    });

    setActiveOfferPostId(null);
    setOfferDescription('');
    setOfferImage(null);
  };

  const filteredPosts = posts.filter((post) => {
    if (filterType === 'all') return true;
    return post.type === filterType;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 bg-[#FEFDF7]">
      {/* Cute Slide Banner "How it works: Post what you need, sellers submit offers!" (Page 10) */}
      <div className="bg-[#D8F3DC] border-2 border-[#95D5B2] rounded-3xl p-5 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#74C69D] flex items-center justify-center text-2xl shadow-xs shrink-0">
            🐰
          </div>
          <div>
            <div className="font-['Fredoka'] text-lg font-bold text-[#1B4332]">
              How it works: Reverse Market TRIVEST 💬
            </div>
            <p className="text-xs text-[#2D6A4F] font-['Quicksand'] font-semibold">
              Post what you need, sellers submit offers! Pembeli memposting kebutuhan pakaian bekas, dan penjual menawarkan barang yang pas.
            </p>
          </div>
        </div>
      </div>

      {/* Cute Compose Box */}
      <div className="bg-white rounded-3xl border-2 border-[#E8DFD0] p-5 shadow-xs space-y-4">
        <div className="flex items-start gap-3.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-2xl object-cover shrink-0 border-2 border-[#F0E6D2]"
          />

          <form onSubmit={handleCreatePost} className="flex-1 space-y-3">
            {/* Post Type Selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPostType('wanted')}
                className={`px-3 py-1.5 text-xs font-['Fredoka'] font-bold rounded-xl transition-all cursor-pointer ${
                  postType === 'wanted'
                    ? 'bg-[#E05780] text-white shadow-xs'
                    : 'bg-[#FFE5EC] text-[#E05780] hover:bg-[#FFCCD5]'
                }`}
              >
                🔍 Cari Baju Bekas (Wanted)
              </button>
              <button
                type="button"
                onClick={() => setPostType('available')}
                className={`px-3 py-1.5 text-xs font-['Fredoka'] font-bold rounded-xl transition-all cursor-pointer ${
                  postType === 'available'
                    ? 'bg-[#40916C] text-white shadow-xs'
                    : 'bg-[#D8F3DC] text-[#1B4332] hover:bg-[#B7E4C7]'
                }`}
              >
                🏷️ Tawarkan Stok Bahan (Available)
              </button>
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder={
                postType === 'wanted'
                  ? 'Contoh: Looking for vintage denim jacket size L untuk rework...'
                  : 'Contoh: Stok 4 kemeja flanel tartan katun tebal siap jahit...'
              }
              className="w-full text-sm font-['Fredoka'] font-bold text-stone-900 placeholder:text-stone-400 border-0 border-b-2 border-stone-200 pb-2 focus:ring-0 focus:border-[#E05780]"
            />

            {/* Description Textarea */}
            <textarea
              rows={2}
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              placeholder="Jelaskan kebutuhan bahan, kondisi yang dicari, atau rencana rework..."
              className="w-full text-xs text-stone-800 placeholder:text-stone-400 border-0 focus:ring-0 p-0 resize-none font-['Quicksand'] font-medium"
            />

            {/* Category & Budget row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100 text-xs font-['Quicksand']">
              <div>
                <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Kategori</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  className="w-full p-2 border border-stone-200 rounded-xl bg-stone-50 text-xs font-semibold"
                >
                  <option value="Fashion">Fashion (Baju & Celana)</option>
                  <option value="Furniture">Furniture & Wood Rework</option>
                  <option value="Denim Vintage">Denim Vintage</option>
                  <option value="Kain Perca">Kain Perca & Patchwork</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 font-bold mb-0.5">
                  {postType === 'wanted' ? 'Maks. Budget (Rp)' : 'Harga Barang (Rp)'}
                </label>
                <input
                  type="number"
                  step="5000"
                  value={postBudget}
                  onChange={(e) => setPostBudget(Number(e.target.value))}
                  className="w-full p-2 border border-stone-200 rounded-xl bg-stone-50 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 font-bold mb-0.5">Lokasi</label>
                <input
                  type="text"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  className="w-full p-2 border border-stone-200 rounded-xl bg-stone-50 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer">
                <Upload className="w-4 h-4 text-[#E05780]" />
                <span>{postImage ? 'Foto Terlampir ✨' : 'Unggah Foto Baju'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const r = new FileReader();
                      r.onloadend = () => setPostImage(r.result as string);
                      r.readAsDataURL(f);
                    }
                  }}
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="px-5 py-2 bg-[#E05780] hover:bg-[#C93B66] text-white font-['Fredoka'] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Posting ke Reverse Market 🐰
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filter Tabs (Slide 10: All, Fashion, Furniture) */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-[#E8DFD0] pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#F5EFE1] rounded-2xl font-['Fredoka'] font-bold text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Semua ({posts.length})
          </button>
          <button
            onClick={() => setFilterType('wanted')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterType === 'wanted'
                ? 'bg-[#E05780] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🔍 Dicari (Wanted)
          </button>
          <button
            onClick={() => setFilterType('available')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterType === 'available'
                ? 'bg-[#40916C] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🏷️ Ditawarkan (Available)
          </button>
        </div>

        <span className="text-[11px] text-stone-500 font-semibold hidden sm:inline font-['Quicksand']">
          Komunitas Thrifting Aktif 🌟
        </span>
      </div>

      {/* Posts Feed Timeline */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isOwner = post.authorId === currentUser.id;
          const isWanted = post.type === 'wanted';

          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl border-2 border-[#E8DFD0] p-5 shadow-xs transition-all hover:border-[#E05780] space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-2xl object-cover border-2 border-[#F0E6D2]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Fredoka'] text-sm font-bold text-stone-900">
                        {post.authorName}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500 font-medium">{post.authorRole}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>{post.createdAt}</span>
                      <span>·</span>
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-[10px] font-['Fredoka'] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 ${
                      isWanted
                        ? 'bg-[#FFE5EC] text-[#E05780] border border-[#FFCCD5]'
                        : 'bg-[#D8F3DC] text-[#1B4332] border border-[#95D5B2]'
                    }`}
                  >
                    {isWanted ? 'Dicari (Wanted)' : 'Tersedia (Stok)'}
                  </span>
                  <div className="font-['Fredoka'] text-xs font-bold text-stone-900">
                    {isWanted ? 'Budget: ' : 'Harga: '}
                    <span className="text-[#E05780]">
                      Rp {post.budgetOrPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-['Fredoka'] text-base font-bold text-stone-900">{post.title}</h3>
                <p className="text-xs text-stone-700 font-['Quicksand'] font-medium leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-[#2D6A4F]">
                  <Tag className="w-3 h-3" />
                  <span>Kategori: {post.category}</span>
                </div>
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden border-2 border-stone-100 max-h-72 bg-stone-100">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Interactive Bottom Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-['Fredoka'] font-bold">
                <div className="flex items-center gap-4 text-stone-600">
                  <button
                    onClick={() => likePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      post.isLiked ? 'text-[#E05780]' : 'hover:text-[#E05780]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-[#E05780]' : ''}`} />
                    <span>{post.likes} Suka</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replies.length} Balasan</span>
                  </button>

                  <span className="flex items-center gap-1 text-[#2D6A4F]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{post.offers.length} Tawaran</span>
                  </span>
                </div>

                <button
                  onClick={() =>
                    setActiveOfferPostId(activeOfferPostId === post.id ? null : post.id)
                  }
                  className="px-3.5 py-1.5 bg-[#FFF3B0] hover:bg-[#FDE047] text-[#78350F] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-[#FDE047]"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Submit Offer 🐰</span>
                </button>
              </div>

              {/* Existing Offers (from Slide 10) */}
              {post.offers.length > 0 && (
                <div className="bg-[#FFFDF6] p-3.5 rounded-2xl border-2 border-[#F0E6D2] space-y-2.5">
                  <div className="text-[11px] font-['Fredoka'] font-bold text-stone-600">
                    Tawaran Baju Bekas yang Diajukan ({post.offers.length})
                  </div>
                  <div className="space-y-2">
                    {post.offers.map((offer) => {
                      const isAccepted = offer.status === 'accepted';
                      return (
                        <div
                          key={offer.id}
                          className="bg-white p-3 rounded-2xl border border-stone-200 flex items-start justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <img
                              src={offer.offererAvatar}
                              alt={offer.offererName}
                              className="w-8 h-8 rounded-xl object-cover shrink-0 mt-0.5 border"
                            />
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-['Fredoka'] text-xs font-bold text-stone-900">
                                  {offer.offererName}
                                </span>
                                <span className="text-[10px] text-stone-400">· {offer.createdAt}</span>
                              </div>
                              <p className="text-xs text-stone-700 font-['Quicksand'] font-medium">
                                {offer.itemDescription}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-bold text-[#E05780]">
                                <span>Kondisi: {offer.itemCondition}</span>
                                <span>·</span>
                                <span>Rp {offer.price.toLocaleString('id-ID')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            {isAccepted ? (
                              <span className="inline-flex items-center gap-1 text-xs font-['Fredoka'] font-bold text-[#2D6A4F] bg-[#D8F3DC] px-2.5 py-1 rounded-xl">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Diterima!
                              </span>
                            ) : isOwner ? (
                              <button
                                onClick={() => acceptOffer(post.id, offer.id)}
                                className="px-3 py-1.5 bg-[#40916C] hover:bg-[#2D6A4F] text-white font-['Fredoka'] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                              >
                                Terima Tawaran
                              </button>
                            ) : (
                              <span className="text-[11px] text-stone-400 italic">Menunggu respon</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Offer Drawer Form */}
              {activeOfferPostId === post.id && (
                <form
                  onSubmit={(e) => handleSubmitOffer(e, post.id)}
                  className="bg-[#FFE5EC]/70 p-4 rounded-2xl border-2 border-[#FFCCD5] space-y-3 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Fredoka'] text-xs font-bold text-[#E05780]">
                      Tawarkan Baju Bekas yang Sesuai
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveOfferPostId(null)}
                      className="text-xs text-stone-500 hover:text-stone-800"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-stone-700 font-bold mb-1">
                        Harga Tawaran (Rp)
                      </label>
                      <input
                        type="number"
                        step="5000"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl bg-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-700 font-bold mb-1">
                        Kondisi Bahan
                      </label>
                      <input
                        type="text"
                        value={offerCondition}
                        onChange={(e) => setOfferCondition(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-700 font-bold mb-1">
                      Deskripsi Baju yang Ditawarkan
                    </label>
                    <textarea
                      rows={2}
                      value={offerDescription}
                      onChange={(e) => setOfferDescription(e.target.value)}
                      placeholder="Jelaskan ukuran, bahan, dan kondisi detail..."
                      className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded-xl bg-white font-['Quicksand']"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#E05780] hover:bg-[#C93B66] text-white font-['Fredoka'] text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Kirim Penawaran ke Pemilik Postingan
                  </button>
                </form>
              )}

              {/* Reply Thread */}
              {activeReplyPostId === post.id && (
                <div className="pt-3 border-t border-stone-100 space-y-3 animate-in fade-in duration-150">
                  {post.replies.map((rep) => (
                    <div key={rep.id} className="flex items-start gap-2.5 text-xs">
                      <img
                        src={rep.authorAvatar}
                        alt={rep.authorName}
                        className="w-6 h-6 rounded-lg object-cover shrink-0 mt-0.5"
                      />
                      <div className="bg-[#FFFDF6] p-2.5 rounded-2xl border border-stone-200 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-['Fredoka'] font-bold text-stone-900">
                            {rep.authorName}
                          </span>
                          <span className="text-[10px] text-stone-400">· {rep.createdAt}</span>
                        </div>
                        <p className="text-stone-700 font-['Quicksand']">{rep.content}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Tulis balasan atau pertanyaan..."
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#E05780]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendReply(post.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSendReply(post.id)}
                      className="p-2 bg-[#E05780] hover:bg-[#C93B66] text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
