import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {BacklogTDO} from '../models/BacklogTDO';
import {BacklogType} from '../types/BacklogType';

const numberOfItemsPerPageList = [2, 3, 4];
const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

interface TableComponentProps {
  onPressEventHandler: () => void;
  items: BacklogType[];
}

const TableComponent = (props: TableComponentProps) => {
  const {onPressEventHandler, items} = props;

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  //   const from = page * numberOfItemsPerPage;
  //   const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          {/* <DataTable.Title numeric>Fat</DataTable.Title> */}
        </DataTable.Header>

        {items.map(x => (
          <DataTable.Row key={x._id}>
            <DataTable.Cell>
              <Button onPress={onPressEventHandler}>{x.name}</Button>{' '}
            </DataTable.Cell>
            <DataTable.Cell>{x.category}</DataTable.Cell>
          </DataTable.Row>
        ))}

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
        /> */}
      </DataTable>
    </ScrollView>
  );
};

export default TableComponent;
