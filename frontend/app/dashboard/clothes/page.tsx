"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import React, { useState } from 'react';

export default function Customers() {
  // États pour les images et les index pour chaque catégorie
  const [teeShirtImages, setTeeShirtImages] = useState<string[]>([]);
  const [teeShirtIndex, setTeeShirtIndex] = useState(0);

  const [pantsImages, setPantsImages] = useState<string[]>([]);
  const [pantsIndex, setPantsIndex] = useState(0);

  const [shoesImages, setShoesImages] = useState<string[]>([]);
  const [shoesIndex, setShoesIndex] = useState(0);

  // Fonction pour gérer l'import des images pour Tee-shirts
  const handleTeeShirtUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setTeeShirtImages(uploadedImages);
      setTeeShirtIndex(0);
    }
  };

  // Fonction pour gérer l'import des images pour Pants
  const handlePantsUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setPantsImages(uploadedImages);
      setPantsIndex(0);
    }
  };

  // Fonction pour gérer l'import des images pour Shoes
  const handleShoesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setShoesImages(uploadedImages);
      setShoesIndex(0);
    }
  };

  // Fonctions pour naviguer entre les images de Tee-shirts
  const handlePreviousTeeShirts = () => {
    setTeeShirtIndex(prevIndex =>
      prevIndex === 0 ? teeShirtImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextTeeShirts = () => {
    setTeeShirtIndex(prevIndex =>
      prevIndex === teeShirtImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonctions pour naviguer entre les images de Pants
  const handlePreviousPants = () => {
    setPantsIndex(prevIndex =>
      prevIndex === 0 ? pantsImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextPants = () => {
    setPantsIndex(prevIndex =>
      prevIndex === pantsImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonctions pour naviguer entre les images de Shoes
  const handlePreviousShoes = () => {
    setShoesIndex(prevIndex =>
      prevIndex === 0 ? shoesImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextShoes = () => {
    setShoesIndex(prevIndex =>
      prevIndex === shoesImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="is-clearfix">
      <Navbar />
      <div className={`${styles.clothes}`}>
        <div className={styles.clothesContainer}>
          <div className="carousel-container">
            {/* Upload images for Tee-shirts */}
            <input type="file" accept="image/*" multiple onChange={handleTeeShirtUpload} />
            {teeShirtImages.length > 0 && (
              <div className="carousel">
                <button className="arrow left-arrow" onClick={handlePreviousTeeShirts}>❮</button>
                <img src={teeShirtImages[teeShirtIndex]} alt={`Tee-shirt Image ${teeShirtIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                <button className="arrow right-arrow" onClick={handleNextTeeShirts}>❯</button>
              </div>
            )}

            {/* Upload images for Pants */}
            <input type="file" accept="image/*" multiple onChange={handlePantsUpload} />
            {pantsImages.length > 0 && (
              <div className="carousel">
                <button className="arrow left-arrow" onClick={handlePreviousPants}>❮</button>
                <img src={pantsImages[pantsIndex]} alt={`Pants Image ${pantsIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                <button className="arrow right-arrow" onClick={handleNextPants}>❯</button>
              </div>
            )}

            {/* Upload images for Shoes */}
            <input type="file" accept="image/*" multiple onChange={handleShoesUpload} />
            {shoesImages.length > 0 && (
              <div className="carousel">
                <button className="arrow left-arrow" onClick={handlePreviousShoes}>❮</button>
                <img src={shoesImages[shoesIndex]} alt={`Shoes Image ${shoesIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                <button className="arrow right-arrow" onClick={handleNextShoes}>❯</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
