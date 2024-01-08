import type { Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const text = data.get('text');

    // TODO: textがnullの場合の例外処理を書く
    if (text == null) {
      throw new Error('text is null');
    } else {
      return {
        text: text as string
      };
    }
  }
} satisfies Actions;
