'use client';

import React, { useState, useEffect } from 'react';
import { Search, Eye, Edit2, Trash2, Plus, X, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

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
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Categories list matching reference PDF image
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      initials: 'JW',
      name: 'Jewellery',
      sub: 6,
      prod: 124,
      status: 'ACTIVE',
      color: 'bg-amber-100 text-amber-800',
    },
    {
      id: 2,
      initials: 'DR',
      name: 'Dresses',
      sub: 5,
      prod: 89,
      status: 'ACTIVE',
      color: 'bg-pink-100 text-pink-800',
    },
    {
      id: 3,
      initials: 'AC',
      name: 'Accessories',
      sub: 4,
      prod: 52,
      status: 'ACTIVE',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 4,
      initials: 'FW',
      name: 'Footwear',
      sub: 3,
      prod: 31,
      status: 'INACTIVE',
      color: 'bg-rose-100 text-rose-800',
    },
    {
      id: 5,
      initials: 'HB',
      name: 'Handbags',
      sub: 2,
      prod: 27,
      status: 'ACTIVE',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      id: 6,
      initials: 'SD',
      name: 'Scarves',
      sub: 3,
      prod: 18,
      status: 'ACTIVE',
      color: 'bg-emerald-100 text-emerald-800',
    },
  ]);

  // Modal display states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Add Form state
  const [addName, setAddName] = useState('');
  const [addStatus, setAddStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [addSub, setAddSub] = useState(0);
  const [addProd, setAddProd] = useState(0);

  // Edit Form state
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [editSub, setEditSub] = useState(0);
  const [editProd, setEditProd] = useState(0);

  // Helper to generate initials from a category name
  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Helper to rotate nice background and text color classes for new categories
  const getNextColor = (index: number): string => {
    const colors = [
      'bg-amber-100 text-amber-800',
      'bg-pink-100 text-pink-800',
      'bg-blue-100 text-blue-800',
      'bg-rose-100 text-rose-800',
      'bg-purple-100 text-purple-800',
      'bg-emerald-100 text-emerald-800',
      'bg-cyan-100 text-cyan-800',
      'bg-indigo-100 text-indigo-800',
    ];
    return colors[index % colors.length];
  };

  // Actions trigger helpers
  const handleOpenAdd = () => {
    setAddName('');
    setAddStatus('ACTIVE');
    setAddSub(0);
    setAddProd(0);
    setIsAddOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    const newCategory: Category = {
      id: Date.now(),
      initials: getInitials(addName),
      name: addName.trim(),
      sub: addSub,
      prod: addProd,
      status: addStatus,
      color: getNextColor(categories.length),
    };

    setCategories((prev) => [...prev, newCategory]);
    setIsAddOpen(false);
  };

  const handleOpenEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditName(category.name);
    setEditStatus(category.status);
    setEditSub(category.sub);
    setEditProd(category.prod);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !editName.trim()) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === selectedCategory.id
          ? {
              ...cat,
              name: editName.trim(),
              initials: getInitials(editName),
              status: editStatus,
              sub: editSub,
              prod: editProd,
            }
          : cat
      )
    );
    setIsEditOpen(false);
  };

  const handleOpenView = (category: Category) => {
    setSelectedCategory(category);
    setIsViewOpen(true);
  };

  const handleOpenDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleDeleteSubmit = () => {
    if (!selectedCategory) return;
    setCategories((prev) => prev.filter((cat) => cat.id !== selectedCategory.id));
    setIsDeleteOpen(false);
    
    // Page correction if the last category on the current page is deleted
    const totalFilteredAfterDelete = filteredCategories.length - 1;
    const maxPage = Math.max(1, Math.ceil(totalFilteredAfterDelete / itemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  // Stats
  const totalCategoriesCount = categories.length;
  const activeCategoriesCount = categories.filter((c) => c.status === 'ACTIVE').length;
  const inactiveCategoriesCount = categories.filter((c) => c.status === 'INACTIVE').length;
  const totalProductsSum = categories.reduce((acc, c) => acc + c.prod, 0);

  // Filter conditions
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && cat.status === 'ACTIVE') ||
      (statusFilter === 'INACTIVE' && cat.status === 'INACTIVE');
    return matchesSearch && matchesStatus;
  });

  // Reset page when search or status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage product categories and subcategories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#221470] hover:bg-[#1a0e5b] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Categories
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-2 block">
            {totalCategoriesCount}
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Active Categories
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-2 block">
            {activeCategoriesCount}
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Inactive Categories
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-2 block">
            {inactiveCategoriesCount}
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Products
          </span>
          <span className="text-3xl font-extrabold text-slate-900 mt-2 block">
            {totalProductsSum}
          </span>
        </div>
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
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex flex-col gap-1 w-full sm:w-36">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent cursor-pointer transition-all"
            >
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories table card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white flex-wrap gap-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Category List
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredCategories.length > 0 ? startIndex + 1 : 0} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} entries
          </span>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-24">
                  Image
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-40">
                  Subcategories
                </th>
                <th className="text-left px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider w-40">
                  Products
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
              {paginatedCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-slate-50/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-xs shadow-2xs select-none ${cat.color}`}
                    >
                      {cat.initials}
                    </div>
                  </td>

                  <td className="px-6 py-4.5 font-semibold text-slate-800 text-sm whitespace-nowrap">
                    {cat.name}
                  </td>

                  <td className="px-6 py-4.5 text-slate-600 text-sm whitespace-nowrap">
                    {cat.sub}
                  </td>

                  <td className="px-6 py-4.5 text-slate-600 text-sm whitespace-nowrap">
                    {cat.prod}
                  </td>

                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase inline-block border ${
                        cat.status === 'ACTIVE'
                          ? 'bg-[#E6F9F0] text-[#00A360] border-emerald-100'
                          : 'bg-[#F1F5F9] text-[#64748B] border-slate-200'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>

                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => handleOpenView(cat)}
                        title="View Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(cat)}
                        title="Edit Category"
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleOpenDelete(cat)}
                        title="Delete Category"
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-750 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-slate-400 text-sm font-medium"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {filteredCategories.length > 0 && (
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

      {/* Custom Dialog Modals */}

      {/* Add Category Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Add New Category
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Footwear"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={addStatus}
                    onChange={(e) => setAddStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent cursor-pointer transition-all"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Subcategories Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={addSub}
                      onChange={(e) => setAddSub(parseInt(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Products Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={addProd}
                      onChange={(e) => setAddProd(parseInt(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-slate-50 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#221470] hover:bg-[#1a0e5b] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Edit Category
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
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Footwear"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent cursor-pointer transition-all"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Subcategories Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editSub}
                      onChange={(e) => setEditSub(parseInt(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Products Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editProd}
                      onChange={(e) => setEditProd(parseInt(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#221470] focus:border-transparent transition-all"
                    />
                  </div>
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {isViewOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                Category Details
              </h3>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-sm shadow-xs ${selectedCategory.color}`}
                >
                  {selectedCategory.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                    {selectedCategory.name}
                  </h4>
                  <span
                    className={`mt-2 inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border ${
                      selectedCategory.status === 'ACTIVE'
                        ? 'bg-[#E6F9F0] text-[#00A360] border-emerald-100'
                        : 'bg-[#F1F5F9] text-[#64748B] border-slate-200'
                    }`}
                  >
                    {selectedCategory.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Subcategories
                  </span>
                  <span className="text-2xl font-extrabold text-slate-800 mt-1 block">
                    {selectedCategory.sub}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Total Products
                  </span>
                  <span className="text-2xl font-extrabold text-slate-800 mt-1 block">
                    {selectedCategory.prod}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 flex justify-end border-t border-slate-100">
              <button
                onClick={() => setIsViewOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-950 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {isDeleteOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-slate-100 max-sm:mx-4 max-w-sm w-full overflow-hidden transform transition-all animate-zoom-in">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto border border-rose-100 text-rose-600 shadow-2xs">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Delete Category
                </h3>
                <p className="text-xs text-slate-500 mt-2 px-1 leading-relaxed">
                  Are you sure you want to permanently delete{' '}
                  <span className="font-bold text-slate-700">
                    "{selectedCategory.name}"
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}