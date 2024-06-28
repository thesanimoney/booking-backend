import {Request, Response} from 'express';
import Post from "../../models/post";
import savedPostsRetreival, {savedPostsMapping} from "../../services/db/savedPosts";
import filterParams from "../../services/filterParams";

const getPosts = async (req: Request, res: Response) => {
    const {filteredParams, minPrice, maxPrice} = filterParams(req.query)

    try {
        const allPosts = await Post.find(filteredParams).select(['-__v']).lean().where('price')
            .gte(minPrice).lte(maxPrice)

        const token = req.header('authorization');

        if (token) {
            const savedPostIds = await savedPostsRetreival(req, token);
            const mappedPosts = await savedPostsMapping(allPosts, savedPostIds!);

            return res.status(200).send(mappedPosts);
        }
        res.status(200).send(allPosts);

    } catch (e) {
        if (e instanceof Error) return res.status(500).send('Something went wrong ' + e.message);
    }
};

export default getPosts;
