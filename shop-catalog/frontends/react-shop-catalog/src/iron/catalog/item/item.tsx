import React, { ChangeEvent } from "react";

import ZenCore from "@zenflux/core";

import { ICatalogItemProps } from "../model";

import './item.css';

/**
 * setAmount in state here for not causing re-rendering of the whole catalog.
 */
export const Item = React.memo(( data: ICatalogItemProps ) => {
    const { id, name, price } = data,
        src = 'img/product-' + id + '.jpg';

    const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const amount = parseInt( event?.target?.value || '1' );

        ZenCore.managers.commands.run( 'Catalog/Item/Commands/SetAmount', {
            ...data,
            amount
        } );

        setAmount( amount );
    };

    const [ amount, setAmount ] = React.useState( 1 );

    return (
        <div className="product">
            <img src={ src } alt={ 'product' + id }/>
            <h4 className="name color-secondary">{ name }</h4>

            <div className="footer">
                <h5>Price: <span className="price">${ price }$</span></h5>
                <div className="row">
                    <button
                        onClick={ () => ZenCore.managers.commands.run( 'Catalog/Item/Commands/Add', {
                            ...data,
                            amount,
                        } ) }
                        className="bg-primary">Add To Cart
                    </button>
                    <input
                        onChange={ onChange } className="amount" type="number" name="amount" value={ amount } min="1"/>
                </div>
            </div>
        </div>
    );
} );

export default Item;