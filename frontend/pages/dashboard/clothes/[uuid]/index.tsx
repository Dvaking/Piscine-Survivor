import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetClothesProps } from "@types";
import { getClothesByCustomerUuid } from "@hooks";
import styles from "@styles/CustomerClothesPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

export default function Customers() {
  const router = useRouter();
  const [clothes, setClothes] = useState<GetClothesProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const customerUuid = router.query.uuid as string;

  const [hatImages, setHatImages] = useState<string[]>([]);
  const [topsImages, setTopsImages] = useState<string[]>([]);
  const [bottomsImages, setBottomsImages] = useState<string[]>([]);
  const [shoesImages, setShoesImages] = useState<string[]>([]);

  const [hatIndex, setHatIndex] = useState(0);
  const [topsIndex, setTopsIndex] = useState(0);
  const [bottomsIndex, setBottomsIndex] = useState(0);
  const [shoesIndex, setShoesIndex] = useState(0);

  useEffect(() => {
    const fetchClothes = async () => {
      if (!customerUuid) return;

      try {
        const fetchedClothes = await getClothesByCustomerUuid(customerUuid);
        console.log("Fetched Clothes:", fetchedClothes);
        setClothes(fetchedClothes);
        setIsLoaded(true);

        const hats = fetchedClothes
          .flatMap((item) => item.clothes)
          .filter((item) => item.type === "hat/cap")
          .map((item) => item.image);

        const tops = fetchedClothes
          .flatMap((item) => item.clothes)
          .filter((item) => item.type === "top")
          .map((item) => item.image);

        const bottoms = fetchedClothes
          .flatMap((item) => item.clothes)
          .filter((item) => item.type === "bottom")
          .map((item) => item.image);

        const shoes = fetchedClothes
          .flatMap((item) => item.clothes)
          .filter((item) => item.type === "shoes")
          .map((item) => item.image);

        setHatImages(hats);
        setTopsImages(tops);
        setBottomsImages(bottoms);
        setShoesImages(shoes);
      } catch (error) {
        console.error("Error fetching clothes:", error);
        setIsLoaded(true);
      }
    };

    fetchClothes();
  }, [customerUuid]);

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

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <button onClick={() => window.history.back()}> <i className="fas fa-arrow-left"></i> Back </button>
      </div>
      <div className={styles.containerBg}>
        <div className={styles.clothesContainer}>
          {hatImages.length > 0 && (
            <div className={styles.carouselContainer}>
              <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={() => handlePrevious(hatIndex, setHatIndex, hatImages)}
              >
                ❮
              </button>
              <div className={styles.carousel}>
                <img
                  src={"data:image/png;base64," + hatImages[hatIndex]}
                  alt={`Hat Image ${hatIndex + 1}`}
                  className={styles.carouselImage}
                />
              </div>
              <button
                className={`${styles.arrow} ${styles.rightArrow}`}
                onClick={() => handleNext(hatIndex, setHatIndex, hatImages)}
              >
                ❯
              </button>
            </div>
          )}

          {topsImages.length > 0 && (
            <div className={styles.carouselContainer}>
              <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={() =>
                  handlePrevious(topsIndex, setTopsIndex, topsImages)
                }
              >
                ❮
              </button>
              <div className={styles.carousel}>
                <img
                  src={"data:image/png;base64," + topsImages[topsIndex]}
                  alt={`Tops Image ${topsIndex + 1}`}
                  className={styles.carouselImage}
                />
              </div>
              <button
                className={`${styles.arrow} ${styles.rightArrow}`}
                onClick={() => handleNext(topsIndex, setTopsIndex, topsImages)}
              >
                ❯
              </button>
            </div>
          )}

          {bottomsImages.length > 0 && (
            <div className={styles.carouselContainer}>
              <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={() =>
                  handlePrevious(bottomsIndex, setBottomsIndex, bottomsImages)
                }
              >
                ❮
              </button>
              <div className={styles.carousel}>
                <img
                  src={"data:image/png;base64," + bottomsImages[bottomsIndex]}
                  alt={`Bottoms Image ${bottomsIndex + 1}`}
                  className={styles.carouselImage}
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
          )}

          {shoesImages.length > 0 && (
            <div className={styles.carouselContainer}>
              <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={() =>
                  handlePrevious(shoesIndex, setShoesIndex, shoesImages)
                }
              >
                ❮
              </button>
              <div className={styles.carousel}>
                <img
                  src={"data:image/png;base64," + shoesImages[shoesIndex]}
                  alt={`Shoes Image ${shoesIndex + 1}`}
                  className={styles.carouselImage}
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
          )}
        </div>
      </div>
    </main>
  );
}
