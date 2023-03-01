import useSWR from 'swr';


const useFetchFromApi = (key: string, account?: string) =>
  useSWR(key, async key => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SAFE_API_URL}/${key}`);
    return await response.json();
  });

export default useFetchFromApi;
