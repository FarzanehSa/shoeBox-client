import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";

import GeneralContext from "../contexts/GeneralContext";
import Product from "./Product";
import ItemNotFound from "./ItemNotFound";
import { getProducts } from "../helper/getProducts";
import { getStyles } from "../helper/getStyles";
import { getColors } from "../helper/getColors";

import "../styles/Collection.scss";

const Collection = () => {
  const [selection, setSelection] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = useParams().id;
  const { products } = useContext(GeneralContext);

  const style = searchParams.get("searchedStyle");
  const color = searchParams.get("searchedColor");
  const priceRange = searchParams.get("searchedPrice");

  // if we refresh the page after price filter we set priceFilter base on search params
  // otherwise it takes range 0 to 300
  useEffect(() => {
    if (!searchParams.get("searchedPrice")) {
      setPriceFilter([0, 300]);
    } else {
      const priceString = searchParams.get("searchedPrice").split(",");
      setPriceFilter([Number(priceString[0]), Number(priceString[1])]);
    }
  }, []); // eslint-disable-line

  // get the selection base on all possible filters
  useEffect(() => {
    setSelection((prev) =>
      getProducts(products, category, style, color, priceRange)
    );
  }, [products, category, style, color, priceRange]);

  const productsLinkArray =
    selection &&
    selection.map((product) => {
      // pass colors family of product to it's component.
      const colorsFamily = products.filter(
        (row) => row.sku.slice(0, 4) === product.sku.slice(0, 4)
      );
      return (
        <Product
          key={product.id}
          product={product}
          colorOptions={colorsFamily}
        />
      );
    });

  // Filter by Style
  const stylesButtonsArray = getStyles(getProducts(products, category)).map(
    (style, index) => {
      return (
        <button
          className="style-buttons"
          key={index}
          onClick={() => {
            searchParams.set("searchedStyle", style);
            setSearchParams(searchParams);
          }}
        >
          {style}
        </button>
      );
    }
  );

  // Filter by Color
  const colorsButtonsArray = getColors(getProducts(products, category)).map(
    (color, index) => {
      return (
        <MenuItem value={color} key={index}>
          <button
            className={`btn2 ${color.toLowerCase()}`}
            key={index}
            onClick={() => {
              searchParams.set("searchedColor", color);
              setSearchParams(searchParams);
            }}
          />
        </MenuItem>
      );
    }
  );

  // by change the price filter we set the search params - unless it was 0 to 300
  const handleChangePriceFilter = (event, newValue) => {
    setPriceFilter(newValue);

    if (!(priceFilter[0] === 0 && priceFilter[1] === 300)) {
      searchParams.set("searchedPrice", [priceFilter]);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="collection-layout">
      <div className="filters">
        <div className="filter-to-buttons">
          <div>Filter:</div>
          <div>
            <FontAwesomeIcon icon="fa-solid fa-filter" />
          </div>
        </div>
        <div className="all-filters">
          <div className="buttons">{stylesButtonsArray}</div>
          <div className="color-and-style-filters">
            {/* set Color filter */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 10, maxWidth: 100 }}>
              <Select value="" displayEmpty>
                <MenuItem value="">
                  <div className="color">Color</div>
                </MenuItem>
                {colorsButtonsArray}
              </Select>
            </FormControl>

            {/* set Price filter */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 180, maxWidth: 200 }}>
              <Select value="" displayEmpty>
                <MenuItem value="">
                  <div className="price">Price</div>
                </MenuItem>
                <div className="slider-price">
                  <Box sx={{ width: 150 }}>
                    <Slider
                      step={50}
                      marks
                      min={0}
                      max={300}
                      valueLabelDisplay="auto"
                      value={priceFilter}
                      onChange={handleChangePriceFilter}
                    />
                  </Box>
                </div>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="all-specific-filters">
        {/* clear style filter */}
        {style && (
          <button
            className="single-filter"
            onClick={() => {
              searchParams.delete("searchedStyle");
              setSearchParams(searchParams);
            }}
          >
            {style} <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        )}

        {/* clear color filter */}
        {color && (
          <button
            className="single-filter"
            onClick={() => {
              searchParams.delete("searchedColor");
              setSearchParams(searchParams);
            }}
          >
            {color} <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        )}

        {priceRange && !(priceRange[0] === 0 && priceRange[1] === 300) && (
          <button
            className="single-filter"
            onClick={() => {
              searchParams.delete("searchedPrice");
              setSearchParams(searchParams);
              setPriceFilter([0, 300]);
            }}
          >
            ${priceFilter[0]} - ${priceFilter[1]}{" "}
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        )}
      </div>
      <div className="products">{productsLinkArray}</div>

      {products.length !== 0 && selection.length === 0 && <ItemNotFound />}

      {products.length === 0 && (
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default Collection;
