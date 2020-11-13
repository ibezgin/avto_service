import { useMutation } from "@apollo/client";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import {
    Mutation,
    ProposalInput,
    ProposalMutationAddProposalArgs,
} from "../../../../service/types/types";
import { ADD_PROPOSAL } from "./gql/add-proposal";

export function useEditProposalHelper() {
    const options = useMutationOptions();

    const [addProposal] = useMutation<
        Mutation,
        ProposalMutationAddProposalArgs
    >(ADD_PROPOSAL, options);

    const sendAddProposal = (data: ProposalInput) => {
        addProposal({
            variables: {
                data,
            },
        });
    };

    return { sendAddProposal };
}
