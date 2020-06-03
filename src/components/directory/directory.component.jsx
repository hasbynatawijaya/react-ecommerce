import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollectionsCategory } from "../../redux/shop/shop.selectors";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import MenuItem from "../menu-item/menu-item.component";

import { DirectoryMenuContainer } from "./directory.styles";

const Directory = ({ collectionsCategory, fetchCollectionsStart }) => {
  React.useEffect(() => {
    fetchCollectionsStart();
  }, []);

  return (
    <DirectoryMenuContainer>
      {collectionsCategory.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </DirectoryMenuContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

const mapStateToProps = createStructuredSelector({
  collectionsCategory: selectCollectionsCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
