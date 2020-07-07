import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import Container from "@material-ui/core/Container";

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <Container maxWidth="md">
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <div>
      {items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  </Container>
);

export default withRouter(CollectionPreview);
