export type Item = {
  label: string;
  onPressHandler: () => void;
};

export type ItemsListProps = {
  label?: string;
  items: Item[];
};
