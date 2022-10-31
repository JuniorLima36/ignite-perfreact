import {memo, useState} from 'react';
import dynamic from 'next/dynamic';
import {AddProductToWishlistProps} from './AddProductToWishlist';
import lodash from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(async () => {
    return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist);
}, {
    loading: () => <span>Carregando...</span>
});

interface ProducItemProps{
    product: {
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    } | undefined;
    onAddToWishList: (id: number | undefined) => void;
}

function ProductItemComponent({product, onAddToWishList}: ProducItemProps){
    const [isAddingToWishList, setIsAddingToWishList] = useState(false);

    return(
        <div>
            {product?.title} - <strong>{product?.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>
                Adicionar aos favoritos
            </button>

            {isAddingToWishList && (
                <AddProductToWishlist 
                    onAddToWishList={() => onAddToWishList(product?.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
});