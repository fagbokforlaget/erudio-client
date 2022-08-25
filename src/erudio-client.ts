import { apiClient } from './erudio';

export type structure_response = {
  data: [];
  pagination: {};
};

export const getStructures = async (
  namespace: string,
  options: object,
): Promise<object> => {
  let url = `/structures/${namespace}/nodes/`;
  try {
    const res = await apiClient.get(url, { params: options });
    return res.data;
  } catch (error) {
    console.error(`${error.response.path} -> ${error.response.status}`);
  }
};

// export function getStructureNode(
//   namespace: string,
//   structure: string,
//   locale: string,
// ): Promise<any> {
//   try {
//     const res = await apiClient.get(
//       `/structures/${namespace}/children/nodes/${structure}`,
//     );
//     return res.data;
//   } catch (error) {
//     console.error(`${error.response.path} -> ${error.response.status}`);
//   }
// }
