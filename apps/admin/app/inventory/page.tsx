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

interface InventoryItem {
  id: number;
  product: string;
  sku: string;
  category: string;
  stock: number;
  reserved: number;
  available: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 1,
      product: 'Diamond Ring',
      sku: 'RNG-101',
      category: 'Jewellery',
      stock: 24,
      reserved: 2,
      available: 22,
      status: 'In Stock',
    },
    {
      id: 2,
      product: 'Gold Necklace',
      sku: 'NCK-202',
      category: 'Jewellery',
      stock: 4,
      reserved: 1,
      available: 3,
      status: 'Low Stock',
    },
    {
      id: 3,
      product: 'Party Wear Dress',
      sku: 'DRS-303',
      category: 'Dresses',
      stock: 0,
      reserved: 0,
      available: 0,
      status: 'Out of Stock',
    },
    {
      id: 4,
      product: 'Silk Saree',
      sku: 'DRS-318',
      category: 'Dresses',
      stock: 32,
      reserved: 5,
      available: 27,
      status: 'In Stock',
    },
    {
      id: 5,
      product: 'Pearl Earrings',
      sku: 'ERG-411',
      category: 'Jewellery',
      stock: 18,
      reserved: 3,
      available: 15,
      status: 'In Stock',
    },
    {
      id: 6,
      product: 'Leather Clutch',
      sku: 'ACC-507',
      category: 'Accessories',
      stock: 6,
      reserved: 1,
      available: 5,
      status: 'Low Stock',
    },
  ]);

  const handleView = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    alert(
      `Product: ${item.product}
SKU: ${item.sku}
Category: ${item.category}
Available: ${item.available}
Status: ${item.status}`
    );
  };

  const handleEdit = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const stock = prompt(
      'Enter new stock quantity',
      item.stock.toString()
    );

    if (!stock) return;

    const newStock = Number(stock);

    setItems(
      items.map((i) =>
        i.id === id
          ? {
              ...i,
              stock: newStock,
              available: newStock - i.reserved,
              status:
                newStock === 0
                  ? 'Out of Stock'
                  : newStock <= 5
                  ? 'Low Stock'
                  : 'In Stock',
            }
          : i
      )
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this inventory item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleExport = () => {
    alert('Inventory exported successfully');
  };

  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      categoryFilter === 'All'
        ? true
        : item.category === categoryFilter;

    const statusMatch =
      statusFilter === 'All'
        ? true
        : item.status === statusFilter;

    return searchMatch && categoryMatch && statusMatch;
  });

  const totalProducts = items.length;
  const inStock = items.filter(
    (i) => i.status === 'In Stock'
  ).length;
  const lowStock = items.filter(
    (i) => i.status === 'Low Stock'
  ).length;
  const outOfStock = items.filter(
    (i) => i.status === 'Out of Stock'
  ).length;

  const badgeStyle = (status: string) => {
    if (status === 'In Stock')
      return 'bg-green-100 text-green-700';
    if (status === 'Low Stock')
      return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-gray-500">
            Monitor and manage product stock levels.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="border px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Download size={16} />
          Export Inventory
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500 text-sm">TOTAL PRODUCTS</p>
          <h2 className="text-3xl font-bold">{totalProducts}</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500 text-sm">IN STOCK</p>
          <h2 className="text-3xl font-bold">{inStock}</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500 text-sm">LOW STOCK</p>
          <h2 className="text-3xl font-bold">{lowStock}</h2>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <p className="text-gray-500 text-sm">OUT OF STOCK</p>
          <h2 className="text-3xl font-bold">{outOfStock}</h2>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border rounded-lg pl-10 pr-4 py-2"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>All</option>
            <option>Jewellery</option>
            <option>Dresses</option>
            <option>Accessories</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="text-left px-5 py-4">Product</th>
              <th className="text-left px-5 py-4">SKU</th>
              <th className="text-left px-5 py-4">Category</th>
              <th className="text-left px-5 py-4">Stock</th>
              <th className="text-left px-5 py-4">Reserved</th>
              <th className="text-left px-5 py-4">Available</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-center px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-5 py-4 font-medium">
                  {item.product}
                </td>

                <td className="px-5 py-4">{item.sku}</td>

                <td className="px-5 py-4">
                  {item.category}
                </td>

                <td className="px-5 py-4">{item.stock}</td>

                <td className="px-5 py-4">
                  {item.reserved}
                </td>

                <td className="px-5 py-4">
                  {item.available}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        handleView(item.id)
                      }
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(item.id)
                      }
                    >
                      <Edit2
                        size={18}
                        className="text-blue-600"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-sm text-gray-500">
            Showing {filteredItems.length} items
          </p>

          <div className="flex gap-2">
            <button className="border px-3 py-2 rounded-md flex items-center gap-1">
              <ChevronLeft size={14} />
              Previous
            </button>

            <button className="border px-3 py-2 rounded-md flex items-center gap-1">
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}