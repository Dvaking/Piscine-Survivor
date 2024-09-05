"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import React, { useState } from 'react';

export default function Customers() {
  // États pour les images et les index pour chaque catégorie
  const [topsImages, setTopsImages] = useState<string[]>([]);
  const [topsIndex, setTopsIndex] = useState(0);

  const [bottomsImages, setBottomsImages] = useState<string[]>([]);
  const [bottomsIndex, setBottomsIndex] = useState(0);

  const [shoesImages, setShoesImages] = useState<string[]>([]);
  const [shoesIndex, setShoesIndex] = useState(0);

  // Fonction pour gérer l'import des images pour Tee-shirts
  const handleTopsUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setTopsImages(uploadedImages);
      setTopsIndex(0);
    }
  };

  // Fonction pour gérer l'import des images pour Pants
  const handleBottomsUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map(file =>
        URL.createObjectURL(file)
      );
      setBottomsImages(uploadedImages);
      setBottomsIndex(0);
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
  const handlePreviousTops = () => {
    setTopsIndex(prevIndex =>
      prevIndex === 0 ? topsImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextTops = () => {
    setTopsIndex(prevIndex =>
      prevIndex === topsImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonctions pour naviguer entre les images de Pants
  const handlePreviousBottoms = () => {
    setBottomsIndex(prevIndex =>
      prevIndex === 0 ? bottomsImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextBottoms = () => {
    setBottomsIndex(prevIndex =>
      prevIndex === bottomsImages.length - 1 ? 0 : prevIndex + 1
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
            <input type="file" accept="image/*" multiple onChange={handleTopsUpload} />
            {topsImages.length > 0 && (
              <div className={`${styles.carouselContainer} mt-4`}>
                <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePreviousTops}>❮</button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img src={topsImages[topsIndex]} alt={`Tops Image ${topsIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                  </div>
                <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNextTops}>❯</button>
              </div>

            )}

            {/* Upload images for Pants */}
            <input type="file" accept="image/*" multiple onChange={handleBottomsUpload} />
            {bottomsImages.length > 0 && (
              <div className={`${styles.carouselContainer} mt-4`}>
                <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePreviousTops}>❮</button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img src={bottomsImages[bottomsIndex]} alt={`Bottoms Image ${bottomsIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                  </div>
                <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNextBottoms}>❯</button>
              </div>
            )}

            {/* Upload images for Shoes */}
            <input type="file" accept="image/*" multiple onChange={handleShoesUpload} />
            {shoesImages.length > 0 && (
              <div className={`${styles.carouselContainer} mt-4`}>
                <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={handlePreviousTops}>❮</button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img src={shoesImages[shoesIndex]} alt={`Shoes Image ${shoesIndex + 1}`} className={`${styles.carouselImage} carousel-image`} />
                  </div>
                <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={handleNextShoes}>❯</button>
            </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
