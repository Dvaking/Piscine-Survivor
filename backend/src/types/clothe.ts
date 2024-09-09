export type ClotheProps = {
  id: number; // Corriger le type de `id` et `customer_id` pour être un nombre
  image: Buffer | string; // Utiliser Buffer pour les données binaires, ou string pour Base64
  type: string;
  customer_id: number;
};

