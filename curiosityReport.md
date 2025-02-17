# Formal Verification

Well I can confidently say that this is the only use for proofs and CS 252 that I can think of. Formal verification is a mathematical method to check if a design of a software is correcrt or functional. It goes through all possible paths of execution to find errors in the design or software. By using formal math proofs. It can simulate every possible path providing a high level of confidence in the design and software.

Software is getting larger and more complicated. The toil to manualy test every possible path is becoming too large. Nearing impossible to do. Formal verification is a mathametical method to test all possible paths in the code to see if there are any errors or flaws in the design. It can be used to test security or if a revision doesn't break the code.

The possible paths in code are represented as equations and through a DUT (The code being tested or verified) it runs through each equation or each path and the checker sees if it runs or fails (true or false)

To start it creates a cone of influence which is all the inputs and ouputs and variables that is used in the various paths of the code or DUT. When the cone is made it goes through each path (inputs, outputs and varibles) and uses the checker to see if they are valid or not.

In a sense, it uses proofs and mathematical equations to test if every possible path works (asserts true) or doesn't (asserts false). It removes the toil of manually testing every possible path and from what I read you do not even need to write test cases for it. It is a way to finnaly use the stuff you learn about proofs in the real world.
