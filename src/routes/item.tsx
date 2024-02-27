import { ItemCard } from "@/components/item-card";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useItemQuery } from "@/lib/queries";
import { ArrowLeftCircle } from "lucide-react";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

export const ItemPage: FC = () => {
  const { id } = useParams() as { id: string };
  const { data: item, isError, isLoading } = useItemQuery(id);

  if (isLoading) return <Spinner />;

  if (item)
    return (
      <>
        <ItemCard item={item} />
      </>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">
          Oops! the item with id: {id}, does not exist.
        </h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeftCircle />
            Go back
          </Link>
        </Button>
      </div>
    );
};
