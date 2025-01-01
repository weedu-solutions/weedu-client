import { useMutation } from 'react-query';
import { Api } from '../../../services/api';

interface StartActionParams {
  id: number;
  status: number;
}

const startAction = async ({ id, status }: StartActionParams) => {
  const response = await Api.put(`/actions/${id}/start`, { status });
  return response.data;
};

export function useStartAction() {
  return useMutation(startAction);
} 