import Image from "next/image";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

// Utilities
import CartProduct from "@typescart.types";
import {
  CartActions,
  addProductToCart,
  decreaseProductQuantity,
  removeProductInCart,
} from "store/reducers/cart/cart.actions";

// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Dispatch } from "redux";

interface ICartItemProps {
  product: CartProduct;
}

export default function CartItem({ product }: ICartItemProps) {
  const dispatch: Dispatch<CartActions> = useDispatch();

  const addProcuctToCartClick = () => {
    dispatch(addProductToCart(product));
  };

  const removeProductInCartClick = () => {
    toast.success("Item removido do carrinho.");
    return dispatch(removeProductInCart(product.id));
  };

  const decreaseProductQuantityClick = () => {
    return dispatch(decreaseProductQuantity(product.id));
  };

  return (
    <div className="flex justify-between gap-3 mt-2 border border-solid border-[#283040] rounded p-1">
      <div className="flex gap-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={150}
          height={0}
          className="rounded object-cover max-h-full min-h-32 max-w-32 min-w-32"
        />
        <div className="flex flex-col gap-3 justify-center font-bold">
          <div className="flex flex-col">
            <h2 className="text-lg text-[#F2B6C1]">{product.name}</h2>
            <span className="text-lg text-[#8C3A60]">R${product.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="cursor-pointer text-xl hover:text-[#8C3A60] transition duration-300"
              onClick={decreaseProductQuantityClick}
            >
              -
            </span>
            <span className="mt-1 text-lg">{product.quantity}</span>
            <span
              className="cursor-pointer text-xl hover:text-[#8C3A60] transition duration-300"
              onClick={addProcuctToCartClick}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <span className="text-xl text-end cursor-pointer hover:text-[#8C3A60] transition duration-300 max-h-1">
        <AlertDialog>
          <AlertDialogTrigger>X</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Deseja realmente excluir esse item do carrinho?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-bold">Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={removeProductInCartClick} className="font-bold">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    </div>
  );
}
