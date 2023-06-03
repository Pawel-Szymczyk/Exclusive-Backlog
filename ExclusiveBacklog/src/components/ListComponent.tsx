import * as React from 'react';
import {List} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {IBacklog} from '../features/backlog/Backlog';

// Helping methods ---------------------------------------------------------

interface AccordionItem {
  key: number;
  title: string;
  data: IBacklog[];
}

const createAccordionList = (items: IBacklog[]): AccordionItem[] => {
  const groupedItems: {[category: string]: IBacklog[]} = {};

  items.forEach(item => {
    if (item.category != null) {
      if (groupedItems[item.category['value']]) {
        groupedItems[item.category['value']].push(item);
      } else {
        groupedItems[item.category['value']] = [item];
      }
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
  onListItemPressEventHandler: (backlog: IBacklog) => void;
  // onListItemPressEventHandler: (id: string, name: string) => void;
  listItems: IBacklog[];
}

const ListComponent = (props: ListComponentProps) => {
  const {onListItemPressEventHandler, listItems, title} = props;
  const accordionItems = createAccordionList(listItems);

  // const [expanded, setExpanded] = React.useState(true);

  // const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView>
      <List.Section title={title}>
        {accordionItems.map(accordionItem => (
          <List.Accordion key={accordionItem.key} title={accordionItem.title}>
            {accordionItem.data.map(item => (
              <List.Item
                key={item.id}
                title={item.name}
                // onPress={() => onListItemPressEventHandler(item.id, item.name)}
                onPress={() => onListItemPressEventHandler(item)}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
};

export default ListComponent;
