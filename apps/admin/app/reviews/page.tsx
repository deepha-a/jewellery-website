'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface Review {
  id: number;
  product: string;
  customer: string;
  rating: number;
  review: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export default function ReviewsPage() {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      product: 'Diamond Ring',
      customer: 'Priya Sharma',
      rating: 5,
      review: 'Excellent quality and packaging.',
      date: '15 Jun 2026',
      status: 'Approved',
    },
    {
      id: 2,
      product: 'Silver Necklace',
      customer: 'Rohan Kumar',
      rating: 4,
      review: 'Good product and fast delivery.',
      date: '14 Jun 2026',
      status: 'Pending',
    },
    {
      id: 3,
      product: 'Party Wear Dress',
      customer: 'Anitha Devi',
      rating: 3,
      review: 'Size mismatch issue.',
      date: '12 Jun 2026',
      status: 'Rejected',
    },
    {
      id: 4,
      product: 'Gold Bangle Set',
      customer: 'Meera',
      rating: 5,
      review: 'Loved the finish, exactly as shown in the pictures.',
      date: '11 Jun 2026',
      status: 'Approved',
    },
    {
      id: 5,
      product: 'Pearl Earrings',
      customer: 'Karan',
      rating: 4,
      review: 'Decent but slightly overpriced for the quality.',
      date: '10 Jun 2026',
      status: 'Pending',
    },
    {
      id: 6,
      product: 'Silk Saree',
      customer: 'Anjali Patel',
      rating: 5,
      review: 'Absolutely stunning! The colors are vibrant and texture is very soft.',
      date: '09 Jun 2026',
      status: 'Approved',
    },
    {
      id: 7,
      product: 'Leather Clutch',
      customer: 'Rajesh',
      rating: 3,
      review: 'Looks nice, but lock mechanism is a bit stiff.',
      date: '08 Jun 2026',
      status: 'Approved',
    },
    {
      id: 8,
      product: 'Diamond Studs',
      customer: 'Vikram Singh',
      rating: 5,
      review: 'Exquisite craftsmanship, wife loved it.',
      date: '07 Jun 2026',
      status: 'Approved',
    },
  ]);

  // Modal display states
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Edit fields state
  const [editReviewText, setEditReviewText] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editStatus, setEditStatus] = useState<'Approved' | 'Pending' | 'Rejected'>('Approved');

  // Handlers
  const handleOpenView = (review: Review) => {
    setSelectedReview(review);
    setIsViewOpen(true);
  };

  const handleOpenEdit = (review: Review) => {
    setSelectedReview(review);
    setEditReviewText(review.review);
    setEditRating(review.rating);
    setEditStatus(review.status);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview || !editReviewText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? {
              ...r,
              review: editReviewText.trim(),
              rating: editRating,
              status: editStatus,
            }
          : r
      )
    );
    setIsEditOpen(false);
  };

  const handleOpenDelete = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = () => {
    if (!selectedReview) return;
    setReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
    setIsDeleteOpen(false);

    // Page index adjustment on delete
    const totalFilteredAfterDelete = filteredReviews.length - 1;
    const maxPage = Math.max(1, Math.ceil(totalFilteredAfterDelete / itemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  const handleExportTrigger = () => {
    setIsExportOpen(true);
  };

  // Filter conditions
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.toLowerCase().includes(search.toLowerCase()) ||
      review.customer.toLowerCase().includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === 'All Ratings' ? true : review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, ratingFilter]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeStyle = (status: string) => {
    if (status === 'Approved') {
      return {
        pill: 'bg-[#E6F9F0] text-[#00A360] border-emerald-100',
        dot: 'bg-[#00A360]',
      };
    }
    if (status === 'Pending') {
      return {
        pill: 'bg-[#FFF4E6] text-[#FF8C00] border-orange-100',
        dot: 'bg-[#FF8C00]',
      };
    }
    return {
      pill: 'bg-[#FDF2F2] text-[#E02424] border-red-150',
      dot: 'bg-[#E02424]',
    };
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            className={
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-200'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage customer reviews and ratings.
          </p>
        </div>

        <button
          onClick={handleExportTrigger}
          className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-xs transition-colors shadow-xs cursor-pointer"
        >
          <Download size={14} />
          Export Reviews
        </button>
      </div>

      {/* Search & filter row */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search product or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex flex-col gap-1 w-full sm:w-40">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Rating Filter
            </label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent cursor-pointer transition-all bg-white"
            >
              <option value="All Ratings">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table header info */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white flex-wrap gap-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Review List
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredReviews.length > 0 ? startIndex + 1 : 0} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of {filteredReviews.length} entries
          </span>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-32">
                  Rating
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-72">
                  Review
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-36">
                  Date
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-36">
                  Status
                </th>
                <th className="text-right px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedReviews.map((review) => {
                const styles = getStatusBadgeStyle(review.status);
                return (
                  <tr
                    key={review.id}
                    className="hover:bg-slate-50/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4.5 font-bold text-slate-800 text-sm whitespace-nowrap">
                      {review.product}
                    </td>

                    <td className="px-6 py-4.5 text-slate-700 text-sm font-semibold whitespace-nowrap">
                      {review.customer}
                    </td>

                    <td className="px-6 py-4.5 whitespace-nowrap">
                      {renderStars(review.rating)}
                    </td>

                    <td className="px-6 py-4.5 text-slate-600 text-sm max-w-xs truncate" title={review.review}>
                      {review.review}
                    </td>

                    <td className="px-6 py-4.5 text-slate-500 text-sm whitespace-nowrap">
                      {review.date}
                    </td>

                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border inline-flex items-center gap-1.5 w-fit ${styles.pill}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>
                        {review.status}
                      </span>
                    </td>

                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleOpenView(review)}
                          title="View Review"
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(review)}
                          title="Edit Review"
                          className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          onClick={() => handleOpenDelete(review)}
                          title="Delete Review"
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-755 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredReviews.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-slate-400 text-sm font-medium"
                  >
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls footer */}
        {filteredReviews.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-white flex-wrap gap-4">
            <span className="text-xs text-slate-400 font-medium">
              Showing page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#221470] text-white'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Review Modal */}
      {isViewOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Review Details
              </h3>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="pb-4 border-b border-slate-100">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Customer Review
                    </span>
                    <h4 className="font-extrabold text-slate-950 text-base leading-tight mt-1">
                      {selectedReview.customer}
                    </h4>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                      getStatusBadgeStyle(selectedReview.status).pill
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusBadgeStyle(selectedReview.status).dot}`}></span>
                    {selectedReview.status}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mt-3">
                  {renderStars(selectedReview.rating)}
                  <span className="text-slate-400 font-bold text-[10px] font-mono">
                    {selectedReview.date}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Product
                </span>
                <span className="text-sm font-semibold text-slate-800 block mt-0.5">
                  {selectedReview.product}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Feedback Message
                </span>
                <p className="text-xs text-slate-650 mt-1.5 bg-slate-50 p-4.5 rounded-xl border border-slate-100 leading-relaxed font-medium">
                  "{selectedReview.review}"
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-950 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Close feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Review Modal */}
      {isEditOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Edit Review
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Product & Customer
                  </span>
                  <span className="text-xs font-bold text-slate-800 mt-1 block">
                    {selectedReview.product} reviewed by {selectedReview.customer}
                  </span>
                </div>

                {/* Rating selection (Interactive stars!) */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Rating Stars
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setEditRating(star)}
                        className="text-slate-300 hover:scale-115 transition-transform duration-100 cursor-pointer"
                      >
                        <Star
                          size={18}
                          className={
                            star <= editRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">
                      ({editRating} / 5)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'Approved' | 'Pending' | 'Rejected')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent cursor-pointer transition-all"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Review Text *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={editReviewText}
                    onChange={(e) => setEditReviewText(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all resize-none leading-relaxed font-medium"
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#221470] hover:bg-[#1a0e5b] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Review Confirmation Modal */}
      {isDeleteOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-sm:mx-4 max-w-sm w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto border border-rose-100 text-rose-600 shadow-2xs">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Delete Review
                </h3>
                <p className="text-xs text-slate-500 mt-2 px-1 leading-relaxed">
                  Are you sure you want to permanently delete the review from{' '}
                  <span className="font-bold text-slate-700">
                    "{selectedReview.customer}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-center gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubmit}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Delete review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Confirmation Success Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 text-emerald-600 shadow-2xs">
                <CheckCircle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Reviews Exported
                </h3>
                <p className="text-xs text-slate-500 mt-2 px-1 leading-relaxed">
                  Reviews spreadsheet has been generated and downloaded successfully.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-center border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsExportOpen(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-955 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}