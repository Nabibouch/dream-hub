export function checkId(id: unknown): string {
  const stringId = String(id)

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(stringId)) {
    throw new Error("ID invalide, doit être un UUID");
  }

  return stringId;
}
