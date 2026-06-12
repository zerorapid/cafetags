/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};
