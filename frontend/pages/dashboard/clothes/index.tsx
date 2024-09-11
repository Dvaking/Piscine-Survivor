import { useEffect, useState } from "react";
import { GetClothesProps } from "@types";
import { getClothesByCustomerEmail } from "@hooks";
import "bulma/css/bulma.css";
import styles from "@styles/ClothesPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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

  const [customerEMail, setCustomerEMail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerEMail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Soumission du formulaire avec EMail :", customerEMail);

    try {
      const response = await getClothesByCustomerEmail(customerEMail);
      setClothes(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des vêtements:", error);
    }
  };

  useEffect(() => {
    const setClothesData = () => {
      if (clothes && clothes.length > 0) {
        clothes.map((c) => {
          const { clothes } = c;
          const hats = clothes
            .filter((item) => item.type === "hat/cap")
            .map((item) => item.image);
          const tops = clothes
            .filter((item) => item.type === "top")
            .map((item) => item.image);
          const bottoms = clothes
            .filter((item) => item.type === "bottom")
            .map((item) => item.image);
          const shoes = clothes
            .filter((item) => item.type === "shoes")
            .map((item) => item.image);
          setHatImages(hats);
          setTopsImages(tops);
          setBottomsImages(bottoms);
          setShoesImages(shoes);
        });
      } else {
        console.log("Aucun vêtement trouvé pour cette adresse E-mail.");
      }
    };
    setClothesData();
  }, [clothes]);

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
      <div className={`${styles.clothes} is-clipped`}>
        <div className={`${styles.clothesContainer} is-clipped`}>
          <div className="form-container is-clipped">
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

          <div className="carousel-container is-clipped">
            {hatImages.length > 0 && (
              <>
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
                      src={"data:image/png;base64,"+hatImages[hatIndex]}
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
                      src={"data:image/png;base64,"+topsImages[topsIndex]}
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

            {bottomsImages.length > 0 && (
              <>
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
                      src={"data:image/png;base64,"+bottomsImages[bottomsIndex]}
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

            {shoesImages.length > 0 && (
              <>
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
                      src={"data:image/png;base64,"+shoesImages[shoesIndex]}
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
