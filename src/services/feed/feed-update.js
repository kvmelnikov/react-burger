import { FeedActionType } from '../../utils/websocket';

const updateData = (table, action) => {
  return table.map((row) => {
    const index = action.data.findIndex(
      (updatedRow) => updatedRow.id === row.id
    );
    if (index !== -1) {
      return action.data[index];
    }
    return row;
  });
};

export const FeedUpdate = (prevTable, actions) => {
  let table = prevTable;
  console.log(actions);
  switch (actions.type) {
    case FeedActionType.UPDATE:
      actions.payload.orders.forEach((element) => {
        table = updateData(table, element);
      });
      break;
    default:
      break;
  }

  // actions.forEach((action) => {
  //   switch (action.type) {
  //     case FeedActionType.UPDATE:
  //       table = updateData(table, action);
  //       break;
  //     default:
  //       break;
  //   }
  // });

  return table;
};
