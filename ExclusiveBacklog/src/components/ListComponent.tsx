import * as React from 'react';
import {List} from 'react-native-paper';
import {BacklogType} from '../types/BacklogType';
import {ScrollView} from 'react-native';

// Helping methods ---------------------------------------------------------

interface AccordionItem {
  key: number;
  title: string;
  data: BacklogType[];
}

const createAccordionList = (items: BacklogType[]): AccordionItem[] => {
  const groupedItems: {[category: string]: BacklogType[]} = {};

  items.forEach(item => {
    if (groupedItems[item.category]) {
      groupedItems[item.category].push(item);
    } else {
      groupedItems[item.category] = [item];
    }
  });

  return Object.keys(groupedItems).map((category, index) => ({
    title: category,
    data: groupedItems[category],
    key: index,
  }));
};

// Helping methods end -----------------------------------------------------

interface ListComponentProps {
  title: string;
  onListItemPressEventHandler: () => void;
  listItems: BacklogType[];
}

const ListComponent = (props: ListComponentProps) => {
  const {onListItemPressEventHandler, listItems, title} = props;
  const accordionItems = createAccordionList(listItems);

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView>
      <List.Section title={title}>
        {accordionItems.map(accordionItem => (
          <List.Accordion key={accordionItem.key} title={accordionItem.title}>
            {accordionItem.data.map(item => (
              <List.Item
                key={item._id}
                title={item.name}
                onPress={onListItemPressEventHandler}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default ListComponent;
