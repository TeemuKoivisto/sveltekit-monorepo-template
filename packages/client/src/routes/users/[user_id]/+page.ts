/** @type {import('./$types').PageLoad} */
export async function load({ params }: any) {
  const { user_id } = params
  return { user_id }
}
