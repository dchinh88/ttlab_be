import { PipelineStage } from 'mongoose';
import { MongoCollection } from './constants';
import { softDeleteCondition } from '@/common/constants';
import { compact, isEmpty } from 'lodash';

export const LOOK_UP_CREATED_BY_USER: PipelineStage[] = [
    {
        $lookup: {
            from: MongoCollection.USERS,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdByUser',
            pipeline: [
                {
                    $match: {
                        ...softDeleteCondition,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                    },
                },
            ],
        },
    },
    {
        $unwind: {
            path: '$createdByUser',
            preserveNullAndEmptyArrays: true,
        },
    },
];

export const LOOK_UP_UPDATED_BY_USER: PipelineStage[] = [
    {
        $lookup: {
            from: MongoCollection.USERS,
            localField: 'updatedBy',
            foreignField: '_id',
            as: 'updatedByUser',
            pipeline: [
                {
                    $match: {
                        ...softDeleteCondition,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                    },
                },
            ],
        },
    },
    {
        $unwind: {
            path: '$updatedByUser',
            preserveNullAndEmptyArrays: true,
        },
    },
];

export function cleanPipelineStages(pipelines: PipelineStage[]) {
    const pipelinesWithoutNil = compact(pipelines);
    return pipelinesWithoutNil?.filter((pipeline) => !isEmpty(pipeline));
}
