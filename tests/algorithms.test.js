const {bubbleSort,selectionSort,insertionSort,mergeSort,quickSort,bfs,dfs,ucs}=require('../js/algorithms');

const a=[5,2,9,1,5,6];
const e=[1,2,5,5,6,9];
const fns=[bubbleSort,selectionSort,insertionSort,mergeSort,quickSort];

fns.forEach(fn=>{
    test(`${fn.name} sorts an array`,()=>{
        expect(fn(a)).toEqual(e);
    });
    test(`${fn.name} handles empty input`,()=>{
        expect(fn([])).toEqual([]);
    });
    test(`${fn.name} handles one value`,()=>{
        expect(fn([7])).toEqual([7]);
    });
    test(`${fn.name} handles duplicate values`,()=>{
        expect(fn([1,1,1,2,2])).toEqual([1,1,1,2,2]);
    });
    test(`${fn.name} handles reverse order`,()=>{
        expect(fn([5,4,3,2,1])).toEqual([1,2,3,4,5]);
    });
    test(`${fn.name} handles sorted input`,()=>{
        expect(fn([1,2,3,4,5])).toEqual([1,2,3,4,5]);
    });
    test(`${fn.name} handles negative values`,()=>{
        expect(fn([3,-2,0,-5,4])).toEqual([-5,-2,0,3,4]);
    });
    test(`${fn.name} does not mutate input`,()=>{
        const x=[3,1,2];
        fn(x);
        expect(x).toEqual([3,1,2]);
    });
});

const g={A:[{to:'B',cost:1},{to:'C',cost:1}],B:[{to:'D',cost:1}],C:[{to:'D',cost:1}],D:[]};

test('BFS finds a path',()=>{
    expect(bfs(g,'A','D')).toEqual(['A','B','D']);
});

test('DFS finds a path',()=>{
    expect(dfs(g,'A','D')).toEqual(['A','B','D']);
});

test('BFS finds start node',()=>{
    expect(bfs(g,'A','A')).toEqual(['A']);
});

test('DFS finds start node',()=>{
    expect(dfs(g,'A','A')).toEqual(['A']);
});

test('UCS finds start node',()=>{
    expect(ucs(g,'A','A')).toEqual(['A']);
});

test('UCS finds the lowest cost path',()=>{
    const x={A:[{to:'B',cost:5},{to:'C',cost:1}],B:[{to:'D',cost:1}],C:[{to:'D',cost:2}],D:[]};
    expect(ucs(x,'A','D')).toEqual(['A','C','D']);
});

test('search returns empty path when goal is unreachable',()=>{
    const x={A:[{to:'B',cost:1}],B:[],C:[]};
    expect(bfs(x,'A','C')).toEqual([]);
    expect(dfs(x,'A','C')).toEqual([]);
    expect(ucs(x,'A','C')).toEqual([]);
});

test('search returns empty path when start is missing',()=>{
    expect(bfs(g,'X','D')).toEqual([]);
    expect(dfs(g,'X','D')).toEqual([]);
    expect(ucs(g,'X','D')).toEqual([]);
});
