import { useQuery } from "react-query";
import axios from "services/axios";

interface Props {
  id: string;
}

const fetchMedia = async (id: string) => {
  try {
    if (!id) return undefined;
    const data = await axios.get(`https://ipfs.io/ipfs/${id}`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useMedia({ id }: Props) {
  return useQuery(`nft-${id}`, () => fetchMedia(id), {
    staleTime: 60 * 1000 * 60, // 1hr cache, since the nft details does not change.
    refetchOnWindowFocus: undefined,
  });
}
