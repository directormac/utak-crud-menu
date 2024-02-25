import { useItem } from "@/lib/queries";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ItemPage: FC = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const item = useItem(id);

  useEffect(() => {
    if (!item) navigate("/");
  }, [item, navigate]);

  if (item)
    return (
      <>
        <h1 className="text-3xl font-bold">Item</h1>
        <p>{item.name}</p>
      </>
    );
};
