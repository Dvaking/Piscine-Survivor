"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { getClothesByCustomerEMail } from "@components"; // Assurez-vous que cette fonction est bien importée et définie
import { GetClothesProps } from "@types"; // Assurez-vous que ce type correspond à la structure attendue

export default function Customers() {

  const [clothes, setClothes] = useState<GetClothesProps[]>([]);
  const [hatImages, setHatImages] = useState<string[]>([]);
  const [hatIndex, setHatIndex] = useState(0);

  const [topsImages, setTopsImages] = useState<string[]>([]);
  const [topsIndex, setTopsIndex] = useState(0);

  const [bottomsImages, setBottomsImages] = useState<string[]>([]);
  const [bottomsIndex, setBottomsIndex] = useState(0);

  const [shoesImages, setShoesImages] = useState<string[]>([]);
  const [shoesIndex, setShoesIndex] = useState(0);

  // Initialisation de l'état pour stocker l'EMAIL du client
  const [customerEMail, setCustomerEMail] = useState("");

  // Gestion des changements dans le champ EMAIL
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerEMail(e.target.value);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page

    console.log("Soumission du formulaire avec EMail :", customerEMail);

    try {
      const response = await getClothesByCustomerEMail(customerEMail);
      setClothes(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des vêtements:", error);
    }
  };

  useEffect(() => {
    const setClothesData = () => {
      if (clothes && clothes.length > 0) {
        console.log("hello!");
        clothes.map((c) => {
          const { clothes } = c;
          const hats = clothes
            .filter((item) => item.type === "hats")
            .map((item) => item.image);
          const tops = clothes
            .filter((item) => item.type === "tops")
            .map((item) => item.image);
          const bottoms = clothes
            .filter((item) => item.type === "bottoms")
            .map((item) => item.image);
          const shoes = clothes
            .filter((item) => item.type === "shoes")
            .map((item) => item.image);
          setHatImages(hats);
          setTopsImages(tops);
          setBottomsImages(bottoms);
          setShoesImages(shoes);
        });
        console.log("Vêtements triés par type:", {
          hatImages,
          topsImages,
          bottomsImages,
          shoesImages,
        });
      } else {
        console.log("Aucun vêtement trouvé pour cette adresse E-mail.");
      }
    };
    setClothesData();
  }, [clothes]);

  // Fonctions pour naviguer entre les images de chaque type
  const handlePrevious = (
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    images: string[]
  ) => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const handleNext = (
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    images: string[]
  ) => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <main className="is-clearfix">
      <Navbar />

      <div className={`${styles.clothes}`}>
        <div className={styles.clothesContainer}>
          {/* Formulaire pour entrer l'EMail */}
          <div className="form-container">
            <form
              onSubmit={handleSubmit}
              className="box is-shadowless has-background-white-ter"
            >
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="customer_email"
                    name="customer_email"
                    placeholder="Entrez l'EMail du client"
                    value={customerEMail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Récupérer les vêtements
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Carrousels pour chaque type de vêtements */}
          <div className="carousel-container">
            {/* Carrousel pour les Hats */}
            {hatImages.length > 0 && (
              <>
                <h3>Hats</h3>
                <div className={`${styles.carouselContainer} mt-4`}>
                  <button
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={() =>
                      handlePrevious(hatIndex, setHatIndex, hatImages)
                    }
                  >
                    ❮
                  </button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img
                      src={hatImages[hatIndex]}
                      alt={`Hat Image ${hatIndex + 1}`}
                      className={`${styles.carouselImage} carousel-image`}
                    />
                  </div>
                  <button
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={() => handleNext(hatIndex, setHatIndex, hatImages)}
                  >
                    ❯
                  </button>
                </div>
              </>
            )}

            {/* Carrousel pour les Tops */}
            {topsImages.length > 0 && (
              <>
                <div className={`${styles.carouselContainer} mt-4`}>
                  <button
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={() =>
                      handlePrevious(topsIndex, setTopsIndex, topsImages)
                    }
                  >
                    ❮
                  </button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img
                      src={topsImages[topsIndex]}
                      alt={`Tops Image ${topsIndex + 1}`}
                      className={`${styles.carouselImage} carousel-image`}
                    />
                  </div>
                  <button
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={() =>
                      handleNext(topsIndex, setTopsIndex, topsImages)
                    }
                  >
                    ❯
                  </button>
                </div>
              </>
            )}

            {/* Carrousel pour les Bottoms */}
            {bottomsImages.length > 0 && (
              <>
                <h3>Bottoms</h3>
                <div className={`${styles.carouselContainer} mt-4`}>
                  <button
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={() =>
                      handlePrevious(
                        bottomsIndex,
                        setBottomsIndex,
                        bottomsImages
                      )
                    }
                  >
                    ❮
                  </button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img
                      src={bottomsImages[bottomsIndex]}
                      alt={`Bottoms Image ${bottomsIndex + 1}`}
                      className={`${styles.carouselImage} carousel-image`}
                    />
                  </div>
                  <button
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={() =>
                      handleNext(bottomsIndex, setBottomsIndex, bottomsImages)
                    }
                  >
                    ❯
                  </button>
                </div>
              </>
            )}

            {/* Carrousel pour les Shoes */}
            {shoesImages.length > 0 && (
              <>
                <h3>Shoes</h3>
                <div className={`${styles.carouselContainer} mt-4`}>
                  <button
                    className={`${styles.arrow} ${styles.leftArrow}`}
                    onClick={() =>
                      handlePrevious(shoesIndex, setShoesIndex, shoesImages)
                    }
                  >
                    ❮
                  </button>
                  <div className={`${styles.carousel} mt-4`}>
                    <img
                      src={shoesImages[shoesIndex]}
                      alt={`Shoes Image ${shoesIndex + 1}`}
                      className={`${styles.carouselImage} carousel-image`}
                    />
                  </div>
                  <button
                    className={`${styles.arrow} ${styles.rightArrow}`}
                    onClick={() =>
                      handleNext(shoesIndex, setShoesIndex, shoesImages)
                    }
                  >
                    ❯
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
