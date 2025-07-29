import type { Results } from "./results.model.ts";

export type WorkerInput =
    | {
          type: "UPLOAD";
          data: {
              offset: number;
              data: [number, number][];
          };
      }
    | {
          type: "INIT";
          data: number;
      }
    | {
          type: "RENDER";
          data: {
              N: number;
              S: number;
              P: number;
              reset: boolean;
          };
      };
export type WorkerOutput =
    | {
          type: "INIT";
          data: number;
      }
    | {
          type: "RENDER";
          data: Results;
      };
