import {youtubeParser} from './index'

describe('Test youtubeParser function', () => {
    it('Sum', () => {
        const invalidUrl = "htts://youtu"
        expect(youtubeParser(invalidUrl)).toBe(false);
    })
})