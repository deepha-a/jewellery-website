'use client';

import { useState } from 'react';
import {
  Search,
  Eye,
  Edit2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
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
      rating: 2,
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
      rating: 3,
      review: 'Decent but slightly overpriced.',
      date: '10 Jun 2026',
      status: 'Pending',
    },
  ]);

  const handleView = (id: number) => {
    const review = reviews.find((r) => r.id === id);

    if (!review) return;

    alert(
      `Product: ${review.product}

Customer: ${review.customer}

Rating: ${review.rating}/5

Review: ${review.review}

Status: ${review.status}`
    );
  };

  const handleEdit = (id: number) => {
    const selectedReview = reviews.find((r) => r.id === id);

    if (!selectedReview) return;

    const newReview = prompt(
      'Edit Review',
      selectedReview.review
    );

    if (!newReview?.trim()) return;

    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              review: newReview,
            }
          : review
      )
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this review?')) {
      setReviews(
        reviews.filter((review) => review.id !== id)
      );
    }
  };

  const handleExport = () => {
    alert('Export Reviews Clicked');
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      review.customer
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === 'All Ratings'
        ? true
        : review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating
                ? 'text-orange-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Reviews
          </h1>
          <p className="text-gray-500">
            Manage customer reviews and ratings.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <Download size={16} />
          Export Reviews
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search product or customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg pl-10 pr-4 py-2.5"
            />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2.5"
          >
            <option>All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-lg">
            Review List
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="text-left px-5 py-4">
                Product
              </th>
              <th className="text-left px-5 py-4">
                Customer
              </th>
              <th className="text-left px-5 py-4">
                Rating
              </th>
              <th className="text-left px-5 py-4">
                Review
              </th>
              <th className="text-left px-5 py-4">
                Date
              </th>
              <th className="text-left px-5 py-4">
                Status
              </th>
              <th className="text-center px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((review) => (
              <tr
                key={review.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium">
                  {review.product}
                </td>

                <td className="px-5 py-4">
                  {review.customer}
                </td>

                <td className="px-5 py-4">
                  {renderStars(review.rating)}
                </td>

                <td className="px-5 py-4 max-w-xs truncate">
                  {review.review}
                </td>

                <td className="px-5 py-4">
                  {review.date}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : review.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {review.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        handleView(review.id)
                      }
                    >
                      <Eye
                        size={18}
                        className="text-gray-600 hover:text-black"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(review.id)
                      }
                    >
                      <Edit2
                        size={18}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(review.id)
                      }
                    >
                      <Trash2
                        size={18}
                        className="text-red-600 hover:text-red-800"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredReviews.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-5 py-4 border-t">
          <p className="text-sm text-gray-500">
            Showing {filteredReviews.length} review(s)
          </p>

          <div className="flex gap-2">
            <button className="flex items-center gap-1 border px-3 py-2 rounded-md">
              <ChevronLeft size={15} />
              Previous
            </button>

            <button className="flex items-center gap-1 border px-3 py-2 rounded-md">
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}