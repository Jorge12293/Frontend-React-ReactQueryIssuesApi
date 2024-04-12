import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
    await sleep(2);
    //const { data } = await githubApi.get<Label[]>('/labels')
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100')
    console.log(data)
    return data;
}


export const useLabels = () => {
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        refetchOnWindowFocus: false,
        //staleTime: 1000 * 60 *60 // 1 hour
        // initialData: [
        //     {
        //         color: "ffffff",
        //         default: false,
        //         description: undefined,
        //         id: 791921801,
        //         name: "❤️",
        //         node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        //         url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F"
        //     },
        //     {
        //         color: "e7e7e7",
        //         default: false,
        //         description: undefined,
        //         id: 196858374,
        //         name: "CLA Signed",
        //         node_id: "MDU6TGFiZWwxOTY4NTgzNzQ=",
        //         url: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed"
        //     }
        // ],
        // placeholderData: [
        //     {
        //         color: "ffffff",
        //         default: false,
        //         description: undefined,
        //         id: 791921801,
        //         name: "❤️",
        //         node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        //         url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F"
        //     },
        //     {
        //         color: "e7e7e7",
        //         default: false,
        //         description: undefined,
        //         id: 196858374,
        //         name: "CLA Signed",
        //         node_id: "MDU6TGFiZWwxOTY4NTgzNzQ=",
        //         url: "https://api.github.com/repos/facebook/react/labels/CLA%20Signed"
        //     }
        // ]
    });

    return { labelsQuery };
}
