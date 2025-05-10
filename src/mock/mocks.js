import { axiosMockAdapter } from "@/mock/index.js";

axiosMockAdapter
    .onGet("http://localhost:8888/inventory")
    .reply(200,
        [
            {
                id: 10,
                name: "Bomb",
                price: 30.5
            },
            {
                id: 20,
                name: "fried chicken",
                price: 2.2
            }
        ]
    );