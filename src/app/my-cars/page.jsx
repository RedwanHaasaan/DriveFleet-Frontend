"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Car, Plus, Loader2 } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import EditModal from "@/components/car/EditModal";
import DeleteModal from "@/components/car/DeleteModal";
import { fetchMyCars } from "@/utils/fetchCar";

export default function MyCarsPage() {
  const { data: session, isPending } = useSession();

  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingCar, setEditingCar] = useState(null);
  const [deletingCar, setDeletingCar] = useState(null);

  const loadCars = async () => {
    if (!session?.user?.id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMyCars(session.user.id);
      setCars(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load cars");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) loadCars();
  }, [session]);

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Cars</h1>
            <p className="text-muted-foreground">
              Manage your car listings and track bookings
            </p>
          </div>
          <Link
            href="/add-car"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Car
          </Link>
        </div>

        {/* Cars Grid */}
        {error ? (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        ) : cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onEdit={setEditingCar}
                onDelete={setDeletingCar}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Car className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No cars listed yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start earning by adding your first car
            </p>
            <Link
              href="/add-car"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Your First Car
            </Link>
          </div>
        )}

        {/* Edit Modal */}
        {editingCar && (
          <EditModal
            car={editingCar}
            onClose={() => setEditingCar(null)}
            onSave={() => {
              setEditingCar(null);
              loadCars();
            }}
          />
        )}

        {/* Delete Modal */}
        {deletingCar && (
          <DeleteModal
            car={deletingCar}
            onClose={() => setDeletingCar(null)}
            onConfirm={() => {
              setDeletingCar(null);
              loadCars();
            }}
          />
        )}
      </div>
    </div>
  );
}
