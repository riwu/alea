import React from 'react';
import { Item, Input, Label } from 'native-base';

const TextInput = ({ placeholder, ...props }) => (
  <Item floatingLabel>
    <Label>{placeholder}</Label>
    <Input {...props} />
  </Item>
);

export default TextInput;
