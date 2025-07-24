The purpose of the Senka monorepo is to create a system that makes it easy to build complex applications with the help of LLMs.

The idea is to create all the tools both for LLMs and for humans to build complex applications.

Humans will have an interface to communicate with the AI and to build applications and to visualize and manage and manually edit the applications. Humans will be able to build apps only via a drag and drop builder tool and via AI code generation by communicating with the AI. Non technical humans should be able to create apps.

The AI will use the tools to build the applications.

So far, in the monorepo, we started creating a UI library (packages/ui) and an educational app (packages/app) with dummy/demo data.
But a whole system needs to be put in place to satisfy the needs described above.

In packages/reserved there are some package names reserved for npm. I don't think you need to rely only on the packages I've reserved for npm and some of them might not be needed, but other packages will need to be created/reserved as well. Suggest to create packages that makes sense.

Please help me create a thorough plan for the system. Create a new .md file for this plan.