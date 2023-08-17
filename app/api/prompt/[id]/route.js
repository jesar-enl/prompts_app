import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// GET (read)
export const GET = async (req, { params: id }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate('creator');
    if (!prompt)
      return new Response('Prompt not found!', {
        status: 404,
      });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch all prompts', {
      status: 500,
    });
  }
};

// PATCH (update)
export const PATCH = async (request, { params: id }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    //   Find existing prompt by id
    const existingPrompt = await Prompt.findById(id);
    if (!existingPrompt)
      return new Response('Prompt not found!', {
        status: 404,
      });

    //   update the prmopt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to update prompt', {
      status: 500,
    });
  }
};

// DELETE(delete)
export const DELTE = async (request, { params: id }) => {
  try {
    await connectToDB();

    // Find prompt by id
    await Prompt.findByIdAndRemove(id);

    return new Response('Prompt deleted successfully', {
      status: 200,
    });
  } catch (error) {
    return new Response('Error deleting prompt', {
      status: 500,
    });
  }
};
