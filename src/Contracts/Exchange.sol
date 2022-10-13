// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract TokenSwap {
    
    //create state variables
    
    IERC20 public token1;
    IERC20 public token2;


    uint256 public rate; //πόσα token2 αγοράζει κάποιος με token1

    address private owner;
        
    constructor(
        address _token1,
        address _token2
        
        )  {
            token1 = IERC20(_token1);
            token2 = IERC20(_token2);
            rate = 1000000000000000000; //18 δεκαδικά
            owner = msg.sender;
        }
        
    function swap(IERC20 _token1, IERC20 _token2, uint _amount1, uint _amount2) public {
        
            _token1.transferFrom(msg.sender, address(this), _amount1);
            _token2.transferFrom(address(this), msg.sender, _amount2);
    }

    function returnRate() public returns (uint256){
        return rate;
    }

    address[] internal stakeholders;
    mapping(address => uint256) internal stakes1;
    mapping(address => uint256) internal stakes2;

    function isStakeholder(address _address)
        public
        view
        returns(bool, uint256)
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            if (_address == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }

    function addStakeholder(address _stakeholder)
        public
    {
        (bool _isStakeholder, ) = isStakeholder(_stakeholder);
        if(!_isStakeholder) stakeholders.push(_stakeholder);
    }
    
    function removeStakeholder(address _stakeholder)
       public
    {
       (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
       if(_isStakeholder){
           stakeholders[s] = stakeholders[stakeholders.length - 1];
           stakeholders.pop();
       }
    }

    function stakeOf(uint index, address _address)
       public
       view
       returns(uint)
    {
       if(index == 1) {return stakes1[_address]; }
       else if (index == 2) {return stakes2[_address];}
    }

    function createStake(uint256 index, uint256 _stake) public
    {
        if(index == 1) {
            token1.transferFrom(msg.sender, address(this), _stake);
            if(stakes1[msg.sender] == 0) addStakeholder(msg.sender);
            stakes1[msg.sender] = stakes1[msg.sender]+= (_stake);
        }
        else if (index == 2) {
            token2.transferFrom(msg.sender, address(this), _stake);
            if(stakes2[msg.sender] == 0) addStakeholder(msg.sender);
            stakes2[msg.sender] = stakes2[msg.sender]+= (_stake);
        }
    }

   function removeStake(uint256 value, uint index) public
    {
        if(index == 1){
            if(!sufficientExchangeBalance(index,value)) {
                stakes1[msg.sender] = stakes1[msg.sender] -= value;
                if(stakes1[msg.sender] == 0) removeStakeholder(msg.sender);
                token2.transfer(msg.sender, value*rate/1000000000000000000); //εδώ είναι η διαφορά!
                //Στην ουσία μειώνεται το stake1 αλλά τα χρήματα έρχονται από το άλλο token.
            }
            else {
                stakes1[msg.sender] = stakes1[msg.sender] -= value;
                if(stakes1[msg.sender] == 0) removeStakeholder(msg.sender);
                token1.transfer(msg.sender, value);
            }      
        }

        if(index == 2){
            if(!sufficientExchangeBalance(index,value)) {
                stakes2[msg.sender] = stakes2[msg.sender] -= value;
                if(stakes2[msg.sender] == 0) removeStakeholder(msg.sender);
                token1.transfer(msg.sender, value/rate*1000000000000000000); //εδώ είναι η διαφορά!
                //Στην ουσία μειώνεται το stake1 αλλά τα χρήματα έρχονται από το άλλο token.
            }
            else {
                stakes2[msg.sender] = stakes2[msg.sender] -= value;
                if(stakes2[msg.sender] == 0) removeStakeholder(msg.sender);
                token2.transfer(msg.sender, value);
            }
        }
    }   

    function changeRate (uint256 newValue) public onlyOwner{
       rate = newValue; 
    }

    function sufficientExchangeBalance (uint index, uint256 value) public returns(bool) {
        if(index == 1) {
            if(token1.balanceOf(address(this))<value) return false;
            else return true;
        }
        if(index == 2) {
            if(token2.balanceOf(address(this))<value) return false;
            else return true;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}