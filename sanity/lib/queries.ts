import {defineQuery} from "groq";

export const STARTUPS_QUERY = defineQuery(
'*[_type=="startup" && defined(slug.current)] | order(_createdAt desc) {_id,views, title, slug, _createdAt, author->{   _id,name,image,bio }, description, category, image}')