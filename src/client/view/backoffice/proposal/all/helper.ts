import { useMutation } from "@apollo/client";
import { useMutationOptions } from "./../../../../hooks/use-mutation-options";
import {
    Mutation,
    ProposalInput,
    ProposalMutationAddProposalArgs,
    ProposalMutationUpdateProposalArgs,
} from "./../../../../service/types/types";

import { ADD_PROPOSAL } from "./gql/add-proposal";
import { UPDATE_PROPOSAL } from "./gql/update-proposal";

export function useEditProposalHelper() {
    const options = useMutationOptions();

    const refetchQueries = ["AllProposals", "ProposalById"];

    const [addProposal, addProposalHelper] = useMutation<
        Mutation,
        ProposalMutationAddProposalArgs
    >(ADD_PROPOSAL, options);

    const [updateProposal, updateProposalHelper] = useMutation<
        Mutation,
        ProposalMutationUpdateProposalArgs
    >(UPDATE_PROPOSAL, options);

    const sendAddProposal = (data: ProposalInput) => {
        addProposal({
            variables: {
                data,
            },
            refetchQueries,
        });
    };

    const sendUpdateProposal = (id: string, data: ProposalInput) => {
        updateProposal({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    return {
        mutationLoading:
            addProposalHelper.loading || updateProposalHelper.loading,
        sendAddProposal,
        sendUpdateProposal,
    };
}
