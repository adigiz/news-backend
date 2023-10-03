const newsService = require("../../services/news.service");
const newsController = require("../../controller/news.controller");

jest.mock("../../services/news.service", () => ({
  createNews: jest.fn(),
}));

const mockReq = (body = {}, params = {}, query = {}) => {
  return {
    body: body,
    params: params,
    query: query,
  };
};

const mockRes = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe("news.controller", () => {
  describe("POST /api/news", () => {
    it("should be return news when success", async () => {
      const body = {
        title: "Kebakaran yang mengerikan",
        description: "Kebakaran yang terjadi di tegal",
      };
      const req = mockReq(body);
      const res = mockRes();
      const data = { ...body };
      console.log(res.json);
      newsService.createNews.mockResolvedValue(data);

      await newsController.createNews(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });
});
