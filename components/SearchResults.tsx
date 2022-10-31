import {List, ListRowRenderer} from 'react-virtualized';
import {ProductItem} from './ProductItem';

interface SearchResultsProps {
    totalPrice: number;
    results: Array<{
        id: number;
        price: number;
        priceFormatted: string;
        title: string;
    }> | undefined;
    onAddToWishList: (id: number | undefined) => void;
}

export function SearchResults({results, onAddToWishList, totalPrice}: SearchResultsProps){
    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div>
                <ProductItem product={results?.[index]} onAddToWishList={onAddToWishList} />
            </div>
        )
    };

    return(
        <div>
            <h2>{totalPrice}</h2>

            <List 
                height={300} 
                width={900} 
                rowHeight={30} 
                overscanRowCount={5} 
                rowCount={results?.length || 0} 
                rowRenderer={rowRenderer}
            />
        </div>
    )
}