'use client';

import React, { useState } from 'react';
import { Search, Eye, Edit2, Trash2, Plus } from 'lucide-react';

interface Category {
  id: number;
  initials: string;
  name: string;
  sub: number;
  prod: number;
  status: 'ACTIVE' | 'INACTIVE';
  color: string;
}

export default function CategoriesPage() {
  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      initials: 'JW',
      name: 'Jewellery',
      sub: 6,
      prod: 124,
      status: 'ACTIVE',
      color: 'bg-yellow-100',
    },
    {
      id: 2,
      initials: 'DR',
      name: 'Dresses',
      sub: 5,
      prod: 89,
      status: 'ACTIVE',
      color: 'bg-pink-100',
    },
    {
      id: 3,
      initials: 'AC',
      name: 'Accessories',
      sub: 4,
      prod: 52,
      status: 'ACTIVE',
      color: 'bg-blue-100',
    },
    {
      id: 4,
      initials: 'FW',
      name: 'Footwear',
      sub: 3,
      prod: 31,
      status: 'INACTIVE',
      color: 'bg-red-100',
    },
  ]);

  const handleAdd = () => {
    const categoryName = prompt('Enter category name');

    if (!categoryName?.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      initials: categoryName.slice(0, 2).toUpperCase(),
      name: categoryName,
      sub: 0,
      prod: 0,
      status: 'ACTIVE',
      color: 'bg-green-100',
    };

    setCategories((prev) => [...prev, newCategory]);
  };

  const handleEdit = (id: number) => {
    const category = categories.find((c) => c.id === id);

    if (!category) return;

    const newName = prompt(
      'Edit category name',
      category.name
    );

    if (!newName?.trim()) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              name: newName,
              initials: newName.slice(0, 2).toUpperCase(),
            }
          : cat
      )
    );
  };

  const handleView = (id: number) => {
    const category = categories.find((c) => c.id === id);

    if (!category) return;

    alert(
      `Category Name: ${category.name}
Subcategories: ${category.sub}
Products: ${category.prod}
Status: ${category.status}`
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this category?')) {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Categories
          </h1>
          <p className="text-gray-500">
            Manage product categories and subcategories
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-indigo-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-800"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="text-left px-6 py-4">Image</th>
              <th className="text-left px-6 py-4">Category Name</th>
              <th className="text-left px-6 py-4">Subcategories</th>
              <th className="text-left px-6 py-4">Products</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((cat) => (
              <tr
                key={cat.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold ${cat.color}`}
                  >
                    {cat.initials}
                  </div>
                </td>

                <td className="px-6 py-4 font-medium">
                  {cat.name}
                </td>

                <td className="px-6 py-4">{cat.sub}</td>

                <td className="px-6 py-4">{cat.prod}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      cat.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleView(cat.id)}
                    >
                      <Eye
                        size={18}
                        className="text-gray-500 hover:text-black"
                      />
                    </button>

                    <button
                      onClick={() => handleEdit(cat.id)}
                    >
                      <Edit2
                        size={18}
                        className="text-blue-500 hover:text-blue-700"
                      />
                    </button>

                    <button
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2
                        size={18}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCategories.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}