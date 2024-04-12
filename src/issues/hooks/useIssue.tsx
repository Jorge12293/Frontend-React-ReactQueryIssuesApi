import { useQuery } from '@tanstack/react-query'
import { sleep } from '../../helpers/sleep';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces/issue';

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    await sleep(2);
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    console.log(data)
    return data;
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    console.log(data)
    return data;
}


export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issue',issueNumber],
        queryFn: () => getIssueInfo(issueNumber),
        refetchOnWindowFocus: false,
    })
    const commentsQuery = useQuery({
        queryKey:  ['issue',issueQuery.data?.number,'comments'],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        enabled: issueQuery.data != undefined,
        refetchOnWindowFocus: false,
    })
    return { issueQuery,commentsQuery }
}
